export const itemCypher = {
    /**
     * params: itemId, name, description, rarity, dropChance
     * returns: item
     */
    addItem: `
      CREATE (item:Item {
        name: $name,
        description: $description,
        rarity: $rarity,
        dropChance: $dropChance
      }) RETURN item
    `,
  
    /**
     * params: itemId
     * returns: item
     */
    removeItem: `
      MATCH (item:Item {name: $name})
      DETACH DELETE item
    `,

    updateItem: `
        MATCH (item:Item {name: $name})
        SET item.name = $name, item.description = $description, item.rarity = $rarity, item.dropChance = $dropChance
        RETURN item
    `,
  };
  