import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
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

  // @Prop() imageUrl?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
