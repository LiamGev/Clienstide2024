import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BiomeService } from '@project/frontend-services';
import { Biome, Enemy } from '@project/libs/shared/api';
import { EnemyService } from '@project/frontend-services';
import { BiomeDifficulty } from '@project/libs/shared/api'; 

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
    difficulty: BiomeDifficulty.Easy,
    commonEnemies: [],
  };

  allEnemies: Enemy[] = [];
  biomeDifficulties = Object.values(BiomeDifficulty);

  constructor(
    private route: ActivatedRoute,
    private biomeService: BiomeService,
    private enemyService: EnemyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

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

  onEnemyToggle(enemyId: string | undefined, event: Event): void {
    if (!enemyId) return;
  
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
  
    const current = this.biome.commonEnemies || [];
  
    if (checked) {
      if (!current.some(enemy => enemy._id === enemyId)) {
        this.biome.commonEnemies = [...current, { _id: enemyId } as Enemy];
      }
    } else {
      this.biome.commonEnemies = current.filter(enemy => enemy._id !== enemyId);
    }
  }
  
  
  isSelected(enemyId: string | undefined): boolean {
    if (!enemyId) return false;
    return this.biome.commonEnemies?.some(enemy => enemy._id === enemyId) ?? false;
  }
  
  
}
