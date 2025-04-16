import { Component, OnInit } from '@angular/core';
import { Enemy } from 'libs/shared/api/src/lib/model/enemy.interface';
import { EnemyService } from '@project/frontend-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enemy-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enemy-overview.component.html',
  styleUrls: ['./enemy-overview.component.css']
})
export class EnemyOverviewComponent implements OnInit {
  enemies: Enemy[] = [];

  constructor(private enemyService: EnemyService) {}

  ngOnInit(): void {
    this.enemyService.getAllEnemies().subscribe((data) => {
      console.log('Data from API:', data);
      this.enemies = data;
    });
  }
}
