import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enemy } from 'libs/shared/api/src/lib/model/enemy.interface';
import { EnemyService } from '@project/frontend-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-enemy-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './enemy-form.component.html',
  styleUrls: ['./enemy-form.component.css'],
})
export class EnemyFormComponent implements OnInit {
  enemy: Partial<Enemy> = { name: '', health: 0, damage: 0, class: '', type: '' };

  constructor(
    private enemyService: EnemyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.enemyService.getEnemyById(id).subscribe((data) => (this.enemy = data));
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
}
