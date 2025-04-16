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

    sharedEnemies: `
    MATCH (b1:Biome)-[:SPAWNS]->(e:Enemy)<-[:SPAWNS]-(b2:Biome)
    WHERE b1.name = $currentBiomeName AND b1 <> b2
    RETURN b2.name AS RecommendedBiome, count(e) AS CommonEnemies
    ORDER BY CommonEnemies DESC
    LIMIT 5`,

    AllitemsInBiome: `
    MATCH (b:Biome)-[:SPAWNS]->(e:Enemy)-[:DROPS]->(i:Item)
    WHERE b.name = $biomeName
    RETURN DISTINCT i.name AS AvailableItem
    `,
};
  