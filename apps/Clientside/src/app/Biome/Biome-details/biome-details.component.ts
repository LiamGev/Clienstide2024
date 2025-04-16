import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BiomeService} from '@project/frontend-services';
import { Biome } from '@project/libs/shared/api';
import { EnemyService } from '@project/frontend-services';
import { Enemy } from '@project/libs/shared/api';

@Component({
  selector: 'app-biome-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biome-details.component.html',
  styleUrls: ['./biome-details.component.css'],
})
export class BiomeDetailsComponent implements OnInit {
  biome!: Biome;
  enemies: Enemy[] = [];
  error: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private biomeService: BiomeService,
    private enemyService: EnemyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const biomeId = this.route.snapshot.paramMap.get('id');
  
    if (biomeId) {
      this.biomeService.getBiomeById(biomeId).subscribe({
        next: (biomeData) => {
          this.biome = biomeData;
  
          // Zorg dat de enemies lijst leeg is voordat we beginnen
          this.enemies = [];
  
          // Laad elke enemy op basis van ID
          for (const enemyRef of this.biome.commonEnemies) {
            const id = typeof enemyRef === 'string' ? enemyRef : enemyRef?._id;
  
            if (id) {
              this.enemyService.getEnemyById(id).subscribe({
                next: (enemy) => {
                  this.enemies.push(enemy);
                },
                error: (err) => {
                  console.error(`Fout bij ophalen enemy met id ${id}:`, err);
                }
              });
            }
          }
        },
        error: (err) => {
          console.error('Error fetching biome:', err);
          this.error = 'Biome not found or could not be loaded.';
        }
      });
    } else {
      this.error = 'Invalid biome ID';
    }
  }
  

  onDelete(biomeId: string): void {
    if (confirm(`Are you sure you want to delete this biome?`)) {
      this.biomeService.deleteBiome(biomeId).subscribe(() => {
        alert('Biome deleted successfully');
        this.router.navigate(['/biomes']);
      });
    }
  }
}

