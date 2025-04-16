import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'libs/shared/api/src/lib/model/item.interface';
import { ItemService } from '@project/frontend-services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  item: Item | undefined;
  loading = true;
  error = '';
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Haal ID uit route
    const itemId = this.route.snapshot.paramMap.get('id');
    console.log('Route param ID:', itemId);

    // Haal user ID uit JWT
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.sub || payload.userId;
    }

    if (itemId) {
      this.itemService.getItemById(itemId).subscribe({
        next: (results) => {
          console.log('API response:', results); 
          this.item = results;
          console.log('this is the item: ', this.item);  
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching item:', err); 
          this.error = 'Item not found or could not be loaded.';
          this.loading = false;
        },
      });
    } else {
      console.error('Invalid item ID');
      this.error = 'Invalid item ID';
      this.loading = false;
    }
  }

  onDeleteItem(): void {
    if (this.item) {
      const confirmed = confirm(
        `Are you sure you want to delete the item "${this.item.name}"?`
      );
      if (confirmed) {
        this.itemService.deleteItem(this.item._id!).subscribe(() => {
          alert('Item deleted successfully');
          this.router.navigate(['/items']);
        });
      }
    }
  }
}
