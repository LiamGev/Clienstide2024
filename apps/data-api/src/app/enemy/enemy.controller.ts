import { Controller, Get } from '@nestjs/common';
import { Body, Post, Patch, Delete, Param } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { Enemy } from '@avans-nx-workshop/shared/api';

@Controller('enemy')
export class EnemyController {
    constructor(private readonly enemyService: EnemyService) {}

    @Post()
    async createEnemy(@Body() enemy: Enemy) {
        return this.enemyService.create(enemy);
    }

    @Get()
    async getAllEnemies() {
        return this.enemyService.getAll();
    }

    @Patch(':id')
    async updateEnemy(
        @Param('id') id: string,
        @Body() updateData: Partial<Enemy>,
    ) {
        return this.enemyService.update(id, updateData);
    }

    @Delete(':id')
    async deleteEnemy(@Param('id') id: string) {
        return this.enemyService.delete(id);
    }
}