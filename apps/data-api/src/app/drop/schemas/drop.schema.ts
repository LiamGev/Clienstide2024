import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Enemy } from '../../enemy/schemas/enemy.schema';
import { Item } from '../../item/schemas/item.schema';

export type DropDocument = Drop & Document;

@Schema()
export class Drop {
  @Prop({ required: true, unique: true })
  dropId: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Item', required: true })
  item: Types.ObjectId | Item;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Enemy', required: true })
  enemy: Types.ObjectId | Enemy;

  @Prop({ required: true })
  dropChance: number;

  @Prop({ required: true })
  condition: string;
}

export const DropSchema = SchemaFactory.createForClass(Drop);
