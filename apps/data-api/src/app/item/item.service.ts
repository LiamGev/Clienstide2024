import { Item, Rarity } from '@project/libs/shared/api';
import { HttpException, Injectable, ForbiddenException } from '@nestjs/common';
import { Item as ItemModel, ItemDocument } from './schemas/item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { itemCypher } from './neo4j/item.cypher';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(ItemModel.name) private readonly itemModel: Model<ItemDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async create(item: Item, currentUserId: string): Promise<Item> {
    try {
      const itemWithCreator = {
        ...item,
        createdBy: currentUserId,
      };

      console.log('User ID:', currentUserId);
      console.log('Item to save:', itemWithCreator);

      const createdItem = await new this.itemModel(itemWithCreator).save();

      await this.neo4jService.write(itemCypher.addItem, {
        name: createdItem.name,
        description: createdItem.description,
        rarity: createdItem.rarity,
        dropChance: createdItem.dropChance,
      });

      return {
        ...createdItem.toObject(),
        rarity: createdItem.rarity as Rarity,
      };
    } catch (error) {
      console.log('Error creating item:', error);
      throw new HttpException('Error creating item', 500);
    }
  }

  async getAll(): Promise<Item[]> {
    try {
      const items = await this.itemModel.find().exec();
      return items.map(item => ({
        ...item.toObject(),
        rarity: item.rarity as Rarity,
      }));
    } catch (error) {
      console.log('Error fetching items:', error);
      throw new HttpException('Error fetching items', 500);
    }
  }

  async update(itemId: string, updateData: Partial<Item>, currentUserId: string): Promise<Item> {
    try {
      const item = await this.itemModel.findById(itemId).exec();

      if (!item) {
        throw new HttpException('Item not found', 404);
      }

      if (item.createdBy.toString() !== currentUserId) {
        throw new ForbiddenException('You are not authorized to update this item');
      }

      const updatedItem = await this.itemModel.findByIdAndUpdate(itemId, updateData, { new: true }).exec();

      await this.neo4jService.write(itemCypher.updateItem, {
        name: updatedItem.name,
        description: updatedItem.description,
        rarity: updatedItem.rarity,
        dropChance: updatedItem.dropChance,
      });

      return {
        ...updatedItem.toObject(),
        rarity: updatedItem.rarity as Rarity,
      };
    } catch (error) {
      console.log('Error updating item:', error);
      throw new HttpException('Error updating item', 500);
    }
  }

  async delete(itemId: string, currentUserId: string): Promise<Item> {
    try {
      const item = await this.itemModel.findById(itemId).exec();

      if (!item) {
        throw new HttpException('Item not found', 404);
      }

      if (item.createdBy.toString() !== currentUserId) {
        throw new ForbiddenException('You are not authorized to delete this item');
      }

      const deletedItem = await this.itemModel.findByIdAndDelete(itemId).exec();

      await this.neo4jService.write(itemCypher.removeItem, {
        name: deletedItem.name,
      });

      return {
        ...deletedItem.toObject(),
        rarity: deletedItem.rarity as Rarity,
      };
    } catch (error) {
      console.log('Error deleting item:', error);
      throw new HttpException('Error deleting item', 500);
    }
  }

  async getItemById(itemId: string): Promise<Item> {
    try {
      const item = await this.itemModel.findById(itemId).exec();

      if (!item) {
        throw new HttpException('Item not found', 404);
      }

      return {
        ...item.toObject(),
        rarity: item.rarity as Rarity,
      };
    } catch (error) {
      console.log('Error fetching item by id:', error);
      throw new HttpException('Error fetching item by id', 500);
    }
  }
}
