import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Biome } from '@project/libs/shared/api'
import { BiomeService} from '@project/frontend-services';

@Component({
  selector: 'app-biome-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biome-overview.component.html',
  styleUrls: ['./biome-overview.component.css'],
})
export class BiomeOverviewComponent implements OnInit {
  biomes: Biome[] = [];

  constructor(private biomeService: BiomeService) {}

  ngOnInit(): void {
    this.biomeService.getAllBiomes().subscribe((data) => {
      this.biomes = data;
      console.log('Biomes binnengekomen:', data);
    });
  }
}
