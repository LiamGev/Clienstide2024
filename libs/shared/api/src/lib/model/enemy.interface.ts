import { EnemyType, EnemyClass } from './enums/Enemy';
import { Item } from './item.interface';

export interface Enemy {
  _id?: string;
  name: string;
  type: EnemyType;
  health: number;
  damage: number;
  class: EnemyClass;
  droppedItems?: (string | Item)[];
  createdBy: string; // user ID
  // imageUrl?: string;
}
