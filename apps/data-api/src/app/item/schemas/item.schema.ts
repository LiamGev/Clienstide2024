import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    toObject(): any {
      throw new Error('Method not implemented.');
    }
    @IsMongoId()
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    rarity: string;

    @Prop({ required: true })
    dropChance: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

  // @Prop() imageUrl?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
