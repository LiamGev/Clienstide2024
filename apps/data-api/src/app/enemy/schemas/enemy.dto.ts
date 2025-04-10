import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EnemyDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  health: number;

  @IsNumber()
  @IsNotEmpty()
  damage: number;

  @IsString()
  @IsNotEmpty()
  class: string;
}
