export const enemyCypher = {
    /**
     * params: enemyId, name, type, health, damage, class
     * returns: enemy
     */
    addEnemy: `
      CREATE (enemy:Enemy {
        enemyId: $enemyId,
        name: $name,
        type: $type,
        health: $health,
        damage: $damage,
        class: $class
      }) RETURN enemy
    `,
  
    /**
     * params: enemyId
     * returns: enemy
     */
    removeEnemy: `
      MATCH (enemy:Enemy {enemyId: $enemyId})
      DETACH DELETE enemy
    `,
  
    /**
     * params: enemyId, itemId, dropChance, condition
     * returns: relationship
     */
    linkEnemyToItem: `
      MATCH (enemy:Enemy {enemyId: $enemyId}), (item:Item {itemId: $itemId})
      MERGE (enemy)-[:DROPS {dropChance: $dropChance, condition: $condition}]->(item)
    `,
  
    /**
     * params: enemyId, biomeId
     * returns: relationship
     */
    linkEnemyToBiome: `
      MATCH (enemy:Enemy {enemyId: $enemyId}), (biome:Biome {biomeId: $biomeId})
      MERGE (enemy)-[:SPAWNS_IN]->(biome)
    `,
  
    /**
     * params: enemyId
     * returns: items
     */
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
  