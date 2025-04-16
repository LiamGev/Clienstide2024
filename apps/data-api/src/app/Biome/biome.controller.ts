import { Controller, Get, UseGuards , Request} from '@nestjs/common';
import { BiomeService } from './biome.service';
import { Biome } from './schemas/biome.schema';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common';
import { BiomeDto } from './schemas/biome.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';


@Controller('biome')
export class BiomeController {
    constructor(private readonly biomeService: BiomeService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createBiome(@Body() biome: Biome,@Request() req: any,) {
      const currentUserId = req.user.sub;
      
      const biomeDto = {
        ...biome,
        commonEnemies: biome.commonEnemies.map((enemy: any) => enemy.toString()),
      };
    
      return this.biomeService.create(biomeDto, currentUserId);
    }
    
  
    @UseGuards(AuthGuard)
    @Get()
    async getAllBiomes() {
      return await this.biomeService.getAll();
    }
  
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateBiome(@Param('id') id: string,@Body() updateData: Partial<BiomeDto>,@Request() req: any,) {
      const currentUserId = req.user.sub;
      return this.biomeService.updateBiome(id, updateData, currentUserId);
    }
  
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteBiome(@Param('id') id: string,@Request() req: any,) {
      const currentUserId = req.user.sub;
      return this.biomeService.deleteBiome(id, currentUserId);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getBiomeById(@Param('id') id: string) {
      return await this.biomeService.getBiomeById(id);
    }
}
