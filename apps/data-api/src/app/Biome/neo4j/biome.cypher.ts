export const biomeCypher = {
    /**
     * params: biomeId, name, description, difficulty
     * returns: biome
     */
    addBiome: `
      CREATE (biome:Biome {
        biomeId: $biomeId,
        name: $name,
        description: $description,
        difficulty: $difficulty
      }) RETURN biome
    `,
  
    /**
     * params: biomeId
     * returns: biome
     */
    removeBiome: `
      MATCH (biome:Biome {biomeId: $biomeId})
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
  