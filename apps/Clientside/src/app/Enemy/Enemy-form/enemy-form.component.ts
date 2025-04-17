import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enemy, EnemyClass, EnemyType, Item } from '@project/libs/shared/api';
import { EnemyService } from '@project/frontend-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '@project/frontend-services';

@Component({
  selector: 'app-enemy-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './enemy-form.component.html',
  styleUrls: ['./enemy-form.component.css'],
})
export class EnemyFormComponent implements OnInit {
  enemy: Partial<Enemy> = {
    name: '',
    health: 0,
    damage: 0,
    class: '' as EnemyClass,
    type: '' as EnemyType,
    droppedItems: [],
  };

  enemyTypes = Object.values(EnemyType);
  enemyClasses = Object.values(EnemyClass);
  items: Item[] = [];

  constructor(
    private enemyService: EnemyService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // 🧠 Items ophalen voor dropdown
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
    });

    if (id) {
      this.enemyService.getEnemyById(id).subscribe((data) => {
        this.enemy = {
          ...data,
          droppedItems: data.droppedItems || [],
        };
      });
    }
  }

  onSubmit(): void {
    if (this.enemy._id) {
      this.enemyService.updateEnemy(this.enemy._id, this.enemy).subscribe(() => {
        this.router.navigate(['/enemies']);
      });
    } else {
      this.enemyService.createEnemy(this.enemy as Enemy).subscribe(() => {
        this.router.navigate(['/enemies']);
      });
    }
  }

  onItemToggle(itemId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
  
    const current = this.enemy.droppedItems ?? [];
  
    this.enemy.droppedItems = checked
      ? [...current, this.items.find(item => item._id === itemId)!]
      : current.filter(item => typeof item !== 'string' && item._id !== itemId);
  }
  
}
