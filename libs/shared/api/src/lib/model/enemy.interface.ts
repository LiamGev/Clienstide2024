import { EnemyType, EnemyClass } from './enums/Enemy';

export interface Enemy {
  _id?: string;
  name: string;
  type: EnemyType;
  health: number;
  damage: number;
  class: EnemyClass;
  droppedItems?: string[]; // array of ObjectIds
  createdBy: string; // user ID
  // imageUrl?: string;
}
