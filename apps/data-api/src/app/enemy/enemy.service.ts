import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Enemy as enemyModel, EnemyDocument } from './schemas/enemy.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { enemyCypher } from './neo4j/enemy.cypher';
import { Enemy } from '@avans-nx-workshop/shared/api';


@Injectable()
export class EnemyService {
    constructor(@InjectModel(enemyModel.name) private readonly enemyModel: Model<EnemyDocument>, private readonly neo4jService: Neo4jService) {}

    async create(enemy: Enemy): Promise<Enemy> {
        try {
          const createdEnemy = await (new this.enemyModel(enemy)).save();
      
          await this.neo4jService.write(enemyCypher.addEnemy, {
            name: createdEnemy.name,
            type: createdEnemy.type,
            health: createdEnemy.health,
            damage: createdEnemy.damage,
            class: createdEnemy.class,
          });
      
          return createdEnemy;
        } catch (error) {
          console.log('Error creating enemy:', error);
          throw new HttpException('Error creating enemy', 500);
        }
    }

    async getAll(): Promise<Enemy[]> {
        try {
          const enemies = await this.enemyModel.find().exec();
          return enemies;
        } catch (error) {
          console.log('Error fetching enemies:', error);
          throw new HttpException('Error fetching enemies', 500);
        }
    }

    async update(enemyId: string, updateData: Partial<Enemy>): Promise<Enemy> {
        try {
          const updatedEnemy = await this.enemyModel.findByIdAndUpdate(
            enemyId,
            updateData,
            { new: true }
          ).exec();
      
          if (!updatedEnemy) {
            throw new HttpException('Enemy not found', 404);
          }
      
          await this.neo4jService.write(enemyCypher.updateEnemy, {
            name: updatedEnemy.name,
            type: updatedEnemy.type,
            health: updatedEnemy.health,
            damage: updatedEnemy.damage,
            class: updatedEnemy.class,
          });
      
          return updatedEnemy;
        } catch (error) {
          console.log('Error updating enemy:', error);
          throw new HttpException('Error updating enemy', 500);
        }
    }
        
    async delete(enemyId: string): Promise<Enemy> {
        try {
          const deletedEnemy = await this.enemyModel.findByIdAndDelete(enemyId).exec();
      
          if (!deletedEnemy) {
            throw new HttpException('Enemy not found', 404);
          }
      
          await this.neo4jService.write(enemyCypher.removeEnemy, {
            name: deletedEnemy.name,
          });
      
          return deletedEnemy;
        } catch (error) {
          console.log('Error deleting enemy:', error);
          throw new HttpException('Error deleting enemy', 500);
        }
    }
        
}