import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item, Rarity } from '@project/libs/shared/api';
import { ItemService } from '@project/frontend-services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  item: Partial<Item> = {
    name: '',
    description: '',
    rarity: Rarity.Common,
    dropChance: '',
  };

  rarities = Object.values(Rarity);

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItemById(id).subscribe((data) => {
        this.item = data;
      });
    }
  }

  onSubmit(): void {
    if (this.item._id) {
      this.itemService.updateItem(this.item._id, this.item).subscribe(() => {
        alert('Item updated successfully');
        this.router.navigate(['/items']);
      });
    } else {
      this.itemService.createItem(this.item as Item).subscribe(() => {
        alert('Item created successfully');
        this.router.navigate(['/items']);
      });
    }
  }
}
