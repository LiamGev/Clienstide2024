import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { EnemyClass, EnemyType } from '@project/libs/shared/api';
import { Item, ItemSchema } from '../../item/schemas/item.schema';

export type EnemyDocument = Enemy & Document;

@Schema()
export class Enemy {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: EnemyType, type: String })
  type: EnemyType;

  @Prop({ required: true })
  health: number;

  @Prop({ required: true })
  damage: number;

  @Prop({ required: true, enum: EnemyClass, type: String })
  class: EnemyClass;

  @Prop({ type: [ItemSchema], default: [] })
  droppedItems?: Item[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  // @Prop() imageUrl?: string;
}

export const EnemySchema = SchemaFactory.createForClass(Enemy);
