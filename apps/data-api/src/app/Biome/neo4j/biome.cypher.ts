export const biomeCypher = {
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

    addSpawnRelation: `
        MATCH (e:Enemy { name: $enemyName })
        MATCH (b:Biome { name: $biomeName })
        MERGE (e)-[:SPAWNS_IN]->(b)
        RETURN e, b
    `,
  

    removeBiome: `
      MATCH (biome:Biome {name: $name})
      DETACH DELETE biome
    `,
  
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
  