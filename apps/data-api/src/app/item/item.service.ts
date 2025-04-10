import { Item } from '@avans-nx-workshop/shared/api';
import { HttpException, Injectable } from '@nestjs/common';
import { Item as ItemModel, ItemDocument} from './schemas/item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { itemCypher } from './neo4j/item.cypher';

@Injectable()
export class ItemService {

    constructor(@InjectModel(ItemModel.name) private readonly itemModel: Model<ItemDocument>, private readonly neo4jService: Neo4jService) {}

    async create(item: Item): Promise<Item> {
        try {
          const createdItem = await (new this.itemModel(item)).save();
      
          await this.neo4jService.write(itemCypher.addItem, {
            name: createdItem.name,
            description: createdItem.description,
            rarity: createdItem.rarity,
            dropChance: createdItem.dropChance,
          });
      
          return createdItem;
        } catch (error) {
          console.log('Error creating item:', error);
          throw new HttpException('Error creating item', 500);
        }
    }

    async getAll(): Promise<Item[]> {
        try {
          const items = await this.itemModel.find().exec();
          return items;
        } catch (error) {
          console.log('Error fetching items:', error);
          throw new HttpException('Error fetching items', 500);
        }
    }

    async update(itemId: string, updateData: Partial<Item>): Promise<Item> {
        try {
          const updatedItem = await this.itemModel.findByIdAndUpdate(
            itemId,
            updateData,
            { new: true }
          ).exec();
      
          if (!updatedItem) {
            throw new HttpException('Item not found', 404);
          }
      
          await this.neo4jService.write(itemCypher.updateItem, {
            name: updatedItem.name,
            description: updatedItem.description,
            rarity: updatedItem.rarity,
            dropChance: updatedItem.dropChance,
          });
      
          return updatedItem;
        } catch (error) {
          console.log('Error updating item:', error);
          throw new HttpException('Error updating item', 500);
        }
    }

    async delete(itemId: string): Promise<Item> {
        try {
          const deletedItem = await this.itemModel.findByIdAndDelete(itemId).exec();
      
          if (!deletedItem) {
            throw new HttpException('Item not found', 404);
          }
      
          await this.neo4jService.write(itemCypher.removeItem, {
            name: deletedItem.name,
          });
      
          return deletedItem;
        } catch (error) {
          console.log('Error deleting item:', error);
          throw new HttpException('Error deleting item', 500);
        }
      }
      
      
      
      
}