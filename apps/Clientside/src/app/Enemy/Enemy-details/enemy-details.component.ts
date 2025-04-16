import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enemy } from 'libs/shared/api/src/lib/model/enemy.interface';
import { EnemyService } from '@project/frontend-services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enemy-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.css']
})
export class EnemyDetailsComponent implements OnInit {
  enemy?: Enemy;
  error = '';

  constructor(
    private enemyService: EnemyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const enemyId = this.route.snapshot.paramMap.get('id');
    if (enemyId) {
      this.enemyService.getEnemyById(enemyId).subscribe({
        next: (enemy) => {
          this.enemy = enemy;
        },
        error: (err) => {
          console.error('Error fetching enemy:', err);
          this.error = 'Enemy not found or could not be loaded.';
        }
      });
    } else {
      this.error = 'Invalid enemy ID.';
    }
  }

  onDeleteEnemy(): void {
    if (this.enemy && this.enemy._id) {
      const confirmed = confirm(
        `Are you sure you want to delete the enemy "${this.enemy.name}"?`
      );
      if (confirmed) {
        this.enemyService.deleteEnemy(this.enemy._id).subscribe(() => {
          alert('Enemy deleted successfully');
          this.router.navigate(['/enemies']);
        });
      }
    }
  }
}
