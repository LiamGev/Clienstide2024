import { Component, OnInit } from '@angular/core';
import { Enemy } from 'libs/shared/api/src/lib/model/enemy.interface';
import { EnemyService } from 'libs/shared/api/src/lib/Services/enemy.service';
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
    // Fetch the list of enemies when the component initializes
    this.enemyService.getEnemies().subscribe((data) => {
      this.enemies = data;
    });
  }
}
