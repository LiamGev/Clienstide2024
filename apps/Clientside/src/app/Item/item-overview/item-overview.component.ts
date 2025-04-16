import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from 'libs/shared/api/src/lib/model/item.interface';
import { ItemService } from '@project/frontend-services';

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.css',
})
export class ItemOverviewComponent {
  items: Item[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.getAllItems().subscribe((data) => (this.items = data));
    console.log(this.items);
  }
}
