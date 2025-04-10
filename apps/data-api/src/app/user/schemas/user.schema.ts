import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @IsMongoId()
    _id: string;

    @Prop({ required: true, unique: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], default: ['user'] })
    role: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
