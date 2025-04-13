import { ForbiddenException, Injectable } from '@nestjs/common';
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

    async create(enemy: Enemy, currentUserId: string): Promise<Enemy> {
        try {
          const enemyWithCreator = {
            ...enemy,
            createdBy: currentUserId,  // ⬅️ Voeg hier createdBy toe
          };
      
          const createdEnemy = await (new this.enemyModel(enemyWithCreator)).save();
      
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

    async update(enemyId: string, updateData: Partial<Enemy>, currentUserId: string): Promise<Enemy> {
        const enemy = await this.enemyModel.findById(enemyId).exec();
      
        if (!enemy) {
          throw new HttpException('Enemy not found', 404);
        }
      
        if (enemy.createdBy.toString() !== currentUserId) {
          throw new ForbiddenException('You are not authorized to update this enemy');
        }
      
        const updatedEnemy = await this.enemyModel.findByIdAndUpdate(
          enemyId,
          updateData,
          { new: true }
        ).exec();
      
        // 🛠️ Update ook in Neo4j
        await this.neo4jService.write(enemyCypher.updateEnemy, {
          name: updatedEnemy.name,
          type: updatedEnemy.type,
          health: updatedEnemy.health,
          damage: updatedEnemy.damage,
          class: updatedEnemy.class,
        });
      
        return updatedEnemy;
    }
        
    async delete(enemyId: string, currentUserId: string): Promise<Enemy> {
        const enemy = await this.enemyModel.findById(enemyId).exec();
      
        if (!enemy) {
          throw new HttpException('Enemy not found', 404);
        }
      
        if (enemy.createdBy.toString() !== currentUserId) {
          throw new ForbiddenException('You are not authorized to delete this enemy');
        }
      
        const deletedEnemy = await this.enemyModel.findByIdAndDelete(enemyId).exec();
      
        await this.neo4jService.write(enemyCypher.removeEnemy, {
          name: deletedEnemy.name,
        });
      
        return deletedEnemy;
    }
      
        
}