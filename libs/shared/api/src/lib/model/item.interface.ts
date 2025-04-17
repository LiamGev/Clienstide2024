import { Rarity } from './enums/item';

export interface Item {
  _id?: string;
  name: string;
  description: string;
  rarity: Rarity;
  dropChance: string;
}
