import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Biome, BiomeSchema } from './schemas/biome.schema';
import { Enemy, EnemySchema } from '../enemy/schemas/enemy.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { BiomeController } from './biome.controller';
import { BiomeService } from './biome.service';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { EnemyService } from '../enemy/enemy.service';
import { ItemModule} from '../item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Biome.name, schema: BiomeSchema },{ name: Enemy.name, schema: EnemySchema },{ name: User.name, schema: UserSchema},]), Neo4jModule,  ItemModule,],
  controllers: [BiomeController],
  providers: [BiomeService, EnemyService],
  exports: [BiomeService],
})
export class BiomeModule {}
