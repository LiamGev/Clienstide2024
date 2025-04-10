import { Controller, Get } from '@nestjs/common';
import { BiomeService } from './biome.service';
import { Biome } from './schemas/biome.schema';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common';
import { BiomeDto } from './schemas/biome.dto';


@Controller('biomes')
export class BiomeController {
    constructor(private readonly biomeService: BiomeService) {}

    @Post()
    async createBiome(@Body() biome: Biome) {
      const biomeDto = {
        ...biome,
        commonEnemies: biome.commonEnemies.map((enemy: any) => enemy.toString()),
      };
      return this.biomeService.create(biomeDto);
    }
  
    @Get()
    async getAllBiomes() {
      return this.biomeService.getAll();
    }
  
    @Patch(':id')
    async updateBiome(@Param('id') id: string,@Body() updateData: Partial<BiomeDto>,) {
      return this.biomeService.updateBiome(id, updateData);
    }
  
    @Delete(':id')
    async deleteBiome(@Param('id') id: string) {
      return this.biomeService.deleteBiome(id);
    }
}
