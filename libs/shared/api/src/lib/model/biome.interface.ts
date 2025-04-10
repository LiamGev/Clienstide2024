import { Enemy } from './enemy.interface';

export interface Biome {
  _id?: string; // MongoDB _id als string
  name: string;
  description: string;
  difficulty: string;
  commonEnemies: Enemy[]; // lijst van Enemy objecten
}
