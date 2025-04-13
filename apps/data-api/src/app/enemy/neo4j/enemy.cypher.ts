export const enemyCypher = {
    addEnemy: `
      CREATE (enemy:Enemy {
        name: $name,
        type: $type,
        health: $health,
        damage: $damage,
        class: $class
      }) RETURN enemy
    `,
  
    removeEnemy: `
      MATCH (enemy:Enemy {name: $name})
      DETACH DELETE enemy
    `,

    linkEnemyToItem: `
      MATCH (enemy:Enemy {enemyId: $enemyId}), (item:Item {itemId: $itemId})
      MERGE (enemy)-[:DROPS {dropChance: $dropChance, condition: $condition}]->(item)
    `,

    linkEnemyToBiome: `
      MATCH (enemy:Enemy {enemyId: $enemyId}), (biome:Biome {biomeId: $biomeId})
      MERGE (enemy)-[:SPAWNS_IN]->(biome)
    `,

    getItemsDroppedByEnemy: `
      MATCH (enemy:Enemy {enemyId: $enemyId})-[:DROPS]->(item:Item)
      RETURN item
    `,

    updateEnemy: `
        MATCH (enemy:Enemy {name: $name})
        SET enemy.name = $name, enemy.type = $type, enemy.health = $health, enemy.damage = $damage, enemy.class = $class
        RETURN enemy
    `,
  };
  