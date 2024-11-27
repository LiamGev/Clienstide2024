import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'libs/shared/api/src/lib/model/item.interface';
import { RouterModule, Router } from '@angular/router';
import { ItemService } from 'libs/shared/api/src/lib/Services/item.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  Item: Item | undefined;

  // Simulated item data (in a real app, you'd fetch this from an API)
  items: Item[] = [
    { itemId: 1, name: 'Terraria Sword', description: 'A powerful sword used by heroes.', rarity: 'Rare', dropChance: '10%' },
    { itemId: 2, name: 'Magic Mirror', description: 'A magical mirror that teleports you home.', rarity: 'Common', dropChance: '50%' },
    { itemId: 3, name: 'Golden Key', description: 'A key to open special chests.', rarity: 'Uncommon', dropChance: '20%' }
  ];

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameters
    const itemId = this.route.snapshot.paramMap.get('id');
    this.Item = this.items.find(item => item.itemId === Number(itemId));
  }

  onDeleteItem(): void {
    if (this.Item) {
      const confirmed = confirm(
        `Are you sure you want to delete the item "${this.Item.name}"?`
      );
      if (confirmed) {
        this.itemService.deleteItem(this.Item.itemId).subscribe(() => {
          alert('Item deleted successfully');
          this.router.navigate(['/items']);
        });
      }
    }
  }

}
