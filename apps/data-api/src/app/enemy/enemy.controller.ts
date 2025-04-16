import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Body, Post, Patch, Delete, Param } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { Enemy } from '@avans-nx-workshop/shared/api';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('enemy')
export class EnemyController {
    constructor(private readonly enemyService: EnemyService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createEnemy(@Body() enemy: Enemy,@Request() req: any,) {
      const currentUserId = req.user.sub;  // ⬅️ Hier haal je user id
      return this.enemyService.create(enemy, currentUserId);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllEnemies() {
        return this.enemyService.getAll();
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateEnemy(@Param('id') id: string,@Body() updateData: Partial<Enemy>,@Request() req: any,) {
      const currentUserId = req.user.sub;  // HIER: user id ophalen
      return this.enemyService.update(id, updateData, currentUserId);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteEnemy(@Param('id') id: string,@Request() req: any,) {
      const currentUserId = req.user.sub;  // HIER: user id ophalen
      return this.enemyService.delete(id, currentUserId);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getEnemyById(@Param('id') id: string) {
      const enemy = await this.enemyService.getEnemyById(id);
      return enemy;
    }

}