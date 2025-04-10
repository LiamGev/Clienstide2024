import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ItemDto {
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
  rarity: string;

  @IsString()
  @IsNotEmpty()
  dropChance: string;
}
