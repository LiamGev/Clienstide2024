import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnemyDocument = Enemy & Document;

@Schema()
export class Enemy {
  @Prop({ required: true, unique: true })
  enemyId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  health: number;

  @Prop({ required: true })
  damage: number;

  @Prop({ required: true })
  class: string;

  // @Prop() imageUrl?: string;
}

export const EnemySchema = SchemaFactory.createForClass(Enemy);
