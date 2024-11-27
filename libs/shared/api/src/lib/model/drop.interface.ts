import { Enemy } from "./enemy.interface";
import { Item } from "./item.interface";

export interface Drop {
    dropId: number; // Corresponds to Drop_id
    item: Item; // Foreign key referencing Item
    enemy: Enemy; // Foreign key referencing Enemy
    dropChance: number; // Corresponds to Drop_chance
    condition: string; // Corresponds to Condition
  }
  