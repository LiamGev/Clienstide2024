import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';

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
  commonEnemies?: string[]; // ObjectId's van enemies
}
