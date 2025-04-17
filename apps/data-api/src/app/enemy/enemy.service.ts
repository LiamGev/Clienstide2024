import { ForbiddenException, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enemy as EnemyModel, EnemyDocument } from './schemas/enemy.schema';
import { Item as ItemModel, ItemDocument } from '../item/schemas/item.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { enemyCypher } from './neo4j/enemy.cypher';
import { itemCypher } from '../item/neo4j/item.cypher';
import { Enemy, EnemyClass, EnemyType, Rarity } from '@project/libs/shared/api';
import { Item } from '@project/libs/shared/api';

@Injectable()
export class EnemyService {
  constructor(
    @InjectModel(EnemyModel.name) private readonly enemyModel: Model<EnemyDocument>,
    @InjectModel(ItemModel.name) private readonly itemModel: Model<ItemDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async create(enemy: Enemy, currentUserId: string): Promise<Enemy> {
    try {
      if (!Object.values(EnemyType).includes(enemy.type)) {
        throw new HttpException(`Invalid enemy type: ${enemy.type}`, 400);
      }
      if (!Object.values(EnemyClass).includes(enemy.class)) {
        throw new HttpException(`Invalid enemy class: ${enemy.class}`, 400);
      }

      const itemDocs = await this.itemModel.find({
        _id: { $in: enemy.droppedItems }
      }).lean();

      const enemyWithCreator = {
        ...enemy,
        createdBy: currentUserId,
        droppedItems: itemDocs,
      };

      const createdEnemy = await new this.enemyModel(enemyWithCreator).save();

      await this.neo4jService.write(enemyCypher.addEnemy, {
        name: createdEnemy.name,
        type: createdEnemy.type,
        health: createdEnemy.health,
        damage: createdEnemy.damage,
        class: createdEnemy.class,
      });

      for (const item of createdEnemy.droppedItems || []) {
        await this.neo4jService.write(itemCypher.addDropRelation, {
          enemyName: createdEnemy.name,
          itemName: item.name,
        });
      }

      return {
        ...createdEnemy.toObject(),
        createdBy: createdEnemy.createdBy.toString(),
        droppedItems: createdEnemy.droppedItems?.map(item => ({
          ...item,
          rarity: item.rarity as Rarity, 
        })),
      };
    } catch (error) {
      console.error('Error creating enemy:', error);
      throw new HttpException('Error creating enemy', 500);
    }
  }

  async getAll(): Promise<Enemy[]> {
    try {
      const enemies = await this.enemyModel.find().exec();
      return enemies.map(enemy => ({
        ...enemy.toObject(),
        createdBy: enemy.createdBy.toString(),
        droppedItems: enemy.droppedItems?.map(item => ({
          ...item,
          rarity: item.rarity as Rarity, 
        })),
      }));
    } catch (error) {
      console.error('Error fetching enemies:', error);
      throw new HttpException('Error fetching enemies', 500);
    }
  }

  async getEnemyById(id: string): Promise<Enemy> {
    const enemy = await this.enemyModel.findById(id).lean().exec();
    
    console.log('Enemy loaded:', enemy.droppedItems);

    if (!enemy) {
      throw new HttpException('Enemy not found', 404);
    }

    return {
      ...enemy.toObject(),
      createdBy: enemy.createdBy.toString(),
      droppedItems: enemy.droppedItems?.map(item => ({
        ...item,
        rarity: item.rarity as Rarity,
      })),
    };
  }

  async update(enemyId: string, updateData: Partial<Enemy>, currentUserId: string): Promise<Enemy> {
    const enemy = await this.enemyModel.findById(enemyId).exec();

    if (!enemy) {
      throw new HttpException('Enemy not found', 404);
    }

    if (enemy.createdBy.toString() !== currentUserId) {
      throw new ForbiddenException('You are not authorized to update this enemy');
    }

    if (updateData.type && !Object.values(EnemyType).includes(updateData.type)) {
      throw new HttpException(`Invalid enemy type: ${updateData.type}`, 400);
    }
    if (updateData.class && !Object.values(EnemyClass).includes(updateData.class)) {
      throw new HttpException(`Invalid enemy class: ${updateData.class}`, 400);
    }

    let droppedItems: Item[] | undefined = undefined;

    if (updateData.droppedItems) {
      const itemIds = updateData.droppedItems.map((i: any) =>
        typeof i === 'string' ? i : i._id
      );
    
      const itemDocs = await this.itemModel.find({
        _id: { $in: itemIds }
      }).lean();
    
      droppedItems = itemDocs.map(item => ({
        ...item,
        rarity: item.rarity as Rarity,
      }));
    }

    const updatePayload = {
      ...updateData,
      ...(droppedItems ? { droppedItems } : {}),
    };

    const updatedEnemy = await this.enemyModel.findByIdAndUpdate(
      enemyId,
      updatePayload,
      { new: true }
    ).exec();

    await this.neo4jService.write(enemyCypher.updateEnemy, {
      name: updatedEnemy.name,
      type: updatedEnemy.type,
      health: updatedEnemy.health,
      damage: updatedEnemy.damage,
      class: updatedEnemy.class,
    });

    for (const item of updatedEnemy.droppedItems || []) {
      await this.neo4jService.write(itemCypher.addDropRelation, {
        enemyName: updatedEnemy.name,
        itemName: item.name,
      });
    }

    return {
      ...updatedEnemy.toObject(),
      createdBy: updatedEnemy.createdBy.toString(),
      droppedItems: updatedEnemy.droppedItems?.map(item => ({
        ...item,
        rarity: item.rarity as Rarity, 
      })),
    };
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

    return {
      ...deletedEnemy.toObject(),
      createdBy: deletedEnemy.createdBy.toString(),
      droppedItems: deletedEnemy.droppedItems?.map(item => ({
        ...item,
        rarity: item.rarity as Rarity, 
      })),
    };
  }
}
