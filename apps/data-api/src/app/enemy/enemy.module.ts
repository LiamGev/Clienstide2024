import { Module } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { EnemyController } from './enemy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Enemy, EnemySchema } from './schemas/enemy.schema';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Enemy.name, schema: EnemySchema }]), Neo4jModule],
    controllers: [EnemyController],
    providers: [EnemyService],
    exports: [EnemyService],
})
export class EnemyModule {}