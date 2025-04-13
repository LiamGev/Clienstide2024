import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Enemy } from '../../enemy/schemas/enemy.schema'; // correcte import voor Enemy
import { IsMongoId } from 'class-validator';

export type BiomeDocument = Biome & Document;

@Schema()
export class Biome {
  @IsMongoId()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  difficulty: string;

  @Prop({type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Enemy' }],default: [],})
  commonEnemies: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

}

export const BiomeSchema = SchemaFactory.createForClass(Biome);
