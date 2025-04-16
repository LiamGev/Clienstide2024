import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BiomeService} from '@project/frontend-services';
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
    commonEnemies: []
  };

  enemyIds: string = ''; // Voor invoer van comma-separated enemy IDs

  constructor(
    private route: ActivatedRoute,
    private biomeService: BiomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.biomeService.getBiomeById(id).subscribe((data) => {
        this.biome = data;
        this.enemyIds = (data.commonEnemies as unknown as string[])?.join(',') || '';
      });
    }
  }

  onSubmit(): void {
    // Zet de string van IDs om naar array
    this.biome.commonEnemies = this.enemyIds
    .split(',')
    .map(id => id.trim())
    .filter(id => id.length > 0) as unknown as Enemy[];

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
