import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Enemy } from '../../enemy/schemas/enemy.schema';

export class BiomeDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  difficulty: string; // Als je later enum wil, kan dat ook makkelijk!

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  commonEnemies?: Enemy[]; // ObjectId's van enemies
}
