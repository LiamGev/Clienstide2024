export interface Drop {
    dropId: number; // Corresponds to Drop_id
    itemId: number; // Foreign key referencing Item
    enemyId: number; // Foreign key referencing Enemy
    dropChance: number; // Corresponds to Drop_chance
    condition: string; // Corresponds to Condition
  }
  