export const biomeCypher = {
    /**
     * params: biomeId, name, description, difficulty
     * returns: biome
     */
    addBiome: `
    CREATE (biome:Biome {
      name: $name,
      description: $description,
      difficulty: $difficulty
    })
    WITH biome
    UNWIND $commonEnemies AS enemyName
    MATCH (enemy:Enemy { name: enemyName })
    MERGE (biome)-[:HAS_ENEMY]->(enemy)
    RETURN biome
  `,
  
    /**
     * params: biomeId
     * returns: biome
     */
    removeBiome: `
      MATCH (biome:Biome {name: $name})
      DETACH DELETE biome
    `,
  
    /**
     * params: biomeId
     * returns: enemies
     */
    getEnemiesInBiome: `
      MATCH (enemy:Enemy)-[:SPAWNS_IN]->(biome:Biome {biomeId: $biomeId})
      RETURN enemy
    `,

    updateBiome: `
      MATCH (biome:Biome {name: $name})
        SET biome.name = $name, biome.description = $description, biome.difficulty = $difficulty
        RETURN biome
    `,
  };
  