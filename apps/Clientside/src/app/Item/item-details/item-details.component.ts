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
  items: Item[] = [];

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {
    this.itemService.getItems().subscribe((data) => (this.items = data));
    console.log(this.items);
  }

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
