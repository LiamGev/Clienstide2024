import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enemy } from 'libs/shared/api/src/lib/model/enemy.interface';
import { EnemyService } from 'libs/shared/api/src/lib/Services/enemy.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enemy-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.css']
})
export class EnemyDetailComponent implements OnInit {
  enemy: Enemy | undefined;
  
  enemies: Enemy[] = [];

  constructor(
    private enemyService: EnemyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.enemyService.getEnemies().subscribe((data) => (this.enemies = data));
    console.log(this.enemies);
  }

  ngOnInit(): void {
        const enemyId = this.route.snapshot.paramMap.get('id');
        this.enemy = this.enemies.find(item => item.enemyId === Number(enemyId));
  }

  onDeleteEnemy(): void {
    if (this.enemy) {
      const confirmed = confirm(
        `Are you sure you want to delete the enemy "${this.enemy.name}"?`
      );
      if (confirmed) {
        this.enemyService.deleteEnemy(this.enemy.enemyId).subscribe(() => {
          alert('Enemy deleted successfully');
          this.router.navigate(['/enemies']);
        });
      }
    }
  }

}
