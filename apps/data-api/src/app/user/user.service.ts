import { HttpException, Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { userCypher } from '../user/neo4j/user.cypher';
import { User as UserModel, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@avans-nx-workshop/shared/api';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>, private readonly neo4jService: Neo4jService) {}

    async create(user : User): Promise<User> {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            
            const createdUser = await (new this.userModel(user).save());

            await this.neo4jService.write(userCypher.addUser, { name: createdUser.name, email: createdUser.email });

            return createdUser;
        } catch (error) {
            console.log('Error creating user: ', error);
            if (error.code === 11000) {
                if (error.keyPattern.username) {
                    throw new HttpException('Username is already taken', 400);
                } else if (error.keyPattern.emailAddress) {
                    throw new HttpException('Email is already taken', 400);
                }
            }
            throw new HttpException('Error creating user', 500); 
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
          const users = await this.userModel.find().exec();
          return users;
        } catch (error) {
          console.log('Error fetching users:', error);
          throw new HttpException('Error fetching users', 500);
        }
    }
      

    // Update een gebruiker op basis van ID
    async update(userId: string, updateData: Partial<User>): Promise<User> {
        try {
          const updatedUser = await this.userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
          ).exec();
      
          if (!updatedUser) {
            throw new HttpException('User not found', 404);
          }
      
          await this.neo4jService.write(userCypher.updateUser, {
            name: updatedUser.name,
            email: updatedUser.email,
          });
      
          return updatedUser;
        } catch (error) {
          console.log('Error updating user:', error);
          throw new HttpException('Error updating user', 500);
        }
    }

    async delete(userId: string): Promise<User> {
        try {
          const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
      
          if (!deletedUser) {
            throw new HttpException('User not found', 404);
          }
      
          await this.neo4jService.write(userCypher.removeUser, {
            name: deletedUser.name,
          });
      
          return deletedUser;
        } catch (error) {
          console.log('Error deleting user:', error);
          throw new HttpException('Error deleting user', 500);
        }
    }

    // Haal een gebruiker op basis van naam
    async getByName(name: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ name }).exec();

            if (!user) {
            throw new HttpException('User not found', 404);
            }

            return user;
        } catch (error) {
            console.log('Error fetching user by name:', error);
            throw new HttpException('Error fetching user', 500);
        }
    }

    async getUserByUsername(email: string) {
        const user = await this.userModel.findOne({ email }).exec();
        return { results: user };
    }

    async getUserById(id: string) {
        const user = await this.userModel.findById(id).exec();
        return { results: user };
    }
}