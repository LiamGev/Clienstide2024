import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../model/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[];
  private nextId: number = 1;

  constructor() {
    this.items = [
      { itemId: 1, name: 'Terraria Sword', description: 'A powerful sword used by heroes.', rarity: 'Rare', dropChance: '10%' },
      { itemId: 2, name: 'Magic Mirror', description: 'A magical mirror that teleports you home.', rarity: 'Common', dropChance: '50%' },
      { itemId: 3, name: 'Golden Key', description: 'A key to open special chests.', rarity: 'Uncommon', dropChance: '20%' },
      { itemId: 4, name: 'Shadow Armor', description: 'Armor that increases movement speed.', rarity: 'Rare', dropChance: '15%' },
      { itemId: 5, name: 'Starfury', description: 'A sword that summons falling stars.', rarity: 'Epic', dropChance: '5%' },
    ];
    this.nextId = this.items.length + 1;
  }

  // Fetch all items
  getItems(): Observable<Item[]> {
    return of(this.items);
  }

  // Fetch an item by ID
  getItemById(itemId: number): Observable<Item> {
    const item = this.items.find((item) => item.itemId === itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    return of(item);
  }

  // Create a new item
  createItem(item: Item): Observable<void> {
    const newItem = { ...item, itemId: this.nextId++ };
    this.items.push(newItem);
    return of(undefined);
  }

  // Update an existing item
  updateItem(itemId: number, item: Item): Observable<void> {
    const index = this.items.findIndex((i) => i.itemId === itemId);
    if (index === -1) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    this.items[index] = item;
    return of(undefined);
  }

  // Delete an item by ID
  deleteItem(itemId: number): Observable<void> {
    const index = this.items.findIndex((item) => item.itemId === itemId);
    if (index === -1) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    this.items.splice(index, 1);
    return of(undefined);
  }
}
