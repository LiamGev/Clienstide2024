import { Enemy } from './enemy.interface';
import { BiomeDifficulty } from './enums/biome'; // of juiste pad

export interface Biome {
  _id?: string;
  name: string;
  description: string;
  difficulty: BiomeDifficulty;
  commonEnemies: Enemy[];
}
