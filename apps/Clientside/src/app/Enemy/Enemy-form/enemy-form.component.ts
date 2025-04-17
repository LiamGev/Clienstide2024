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
    const payload = {
      ...this.enemy,
      droppedItems: (this.enemy.droppedItems ?? [])
        .map(item => (typeof item === 'string' ? item : item._id))
        .filter((item): item is string => item !== undefined),
    };
  
    if (this.enemy._id) {
      this.enemyService.updateEnemy(this.enemy._id, payload).subscribe(() => {
        this.router.navigate(['/enemies']);
      });
    } else {
      this.enemyService.createEnemy(payload as Enemy).subscribe(() => {
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

  isItemSelected(itemId: string): boolean {
    return this.enemy.droppedItems?.some(d =>
      typeof d === 'string' ? d === itemId : d._id === itemId
    ) ?? false;
  }
  
}
