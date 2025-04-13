import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type EnemyDocument = Enemy & Document;

@Schema()
export class Enemy {
    @IsMongoId()
    _id: string;

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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

  // @Prop() imageUrl?: string;
}

export const EnemySchema = SchemaFactory.createForClass(Enemy);
