import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BiomeService } from '@project/frontend-services';
import { Biome, Enemy } from '@project/libs/shared/api';
import { EnemyService } from '@project/frontend-services';

@Component({
  selector: 'app-biome-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './biome-form.component.html',
  styleUrls: ['./biome-form.component.css'],
})
export class BiomeFormComponent implements OnInit {
  biome: Partial<Biome> = {
    name: '',
    description: '',
    difficulty: '',
    commonEnemies: [],
  };

  allEnemies: Enemy[] = [];

  constructor(
    private route: ActivatedRoute,
    private biomeService: BiomeService,
    private enemyService: EnemyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Enemies ophalen voor dropdown
    this.enemyService.getAllEnemies().subscribe({
      next: (enemies) => {
        this.allEnemies = enemies;
      },
      error: (err) => {
        console.error('Failed to load enemies:', err);
      },
    });

    if (id) {
      this.biomeService.getBiomeById(id).subscribe((data) => {
        this.biome = {
          ...data,
          commonEnemies: (data.commonEnemies as any[]).map((e: any) =>
            typeof e === 'string' ? e : e._id
          ),
        };
      });
    }
  }

  onSubmit(): void {
    if (this.biome._id) {
      console.log('Biome payload:', this.biome);
      this.biomeService.updateBiome(this.biome._id, this.biome as Biome).subscribe(() => {
        alert('Biome updated successfully.');
        this.router.navigate(['/biomes']);
      });
    } else {
      this.biomeService.createBiome(this.biome as Biome).subscribe(() => {
        alert('Biome created successfully.');
        this.router.navigate(['/biomes']);
      });
    }
  }
}
