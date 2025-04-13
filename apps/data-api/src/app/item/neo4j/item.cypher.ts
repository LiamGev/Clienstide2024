export const itemCypher = {
    addItem: `
      CREATE (item:Item {
        name: $name,
        description: $description,
        rarity: $rarity,
        dropChance: $dropChance
      }) RETURN item
    `,
  
    removeItem: `
      MATCH (item:Item {name: $name})
      DETACH DELETE item
    `,

    addDropRelation: `
    MATCH (e:Enemy { name: $enemyName })
    MATCH (i:Item { name: $itemName })
    MERGE (e)-[:DROPS]->(i)
    RETURN e, i
  `,

    updateItem: `
        MATCH (item:Item {name: $name})
        SET item.name = $name, item.description = $description, item.rarity = $rarity, item.dropChance = $dropChance
        RETURN item
    `,
  };
  