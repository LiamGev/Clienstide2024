import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from 'libs/shared/api/src/lib/model/item.interface';

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.css',
})
export class ItemOverviewComponent {
  Item: Item | undefined;

  // Simulated item data (in a real app, you'd fetch this from an API)
  items: Item[] = [
    { itemId: 1, name: 'Terraria Sword', description: 'A powerful sword used by heroes.', rarity: 'Rare', dropChance: '10%' },
    { itemId: 2, name: 'Magic Mirror', description: 'A magical mirror that teleports you home.', rarity: 'Common', dropChance: '50%' },
    { itemId: 3, name: 'Golden Key', description: 'A key to open special chests.', rarity: 'Uncommon', dropChance: '20%' }
  ];
}
