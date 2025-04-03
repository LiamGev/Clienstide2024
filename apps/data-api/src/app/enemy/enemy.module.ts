import { Module } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { EnemyController } from './enemy.controller';

@Module({
    controllers: [EnemyController],
    providers: [EnemyService],
})
export class EnemyModule {}