import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { Neo4jModule} from './neo4j/neo4j.module';
import { Neo4jScheme } from './neo4j/neo4j.config.interface';
import { EnemyController } from './enemy/enemy.controller';
import { ItemController } from './item/item.controller';
import { AuthModule } from './auth/auth.module';
import { EnemyModule } from './enemy/enemy.module';
import { ItemModule } from './item/item.module';
import { AuthController } from './auth/auth.controller';
import { BiomeController } from './Biome/biome.controller';
import { BiomeModule } from './Biome/biome.module';

@Module({
  imports:[
    MongooseModule.forRoot('mongodb://localhost:27017/Clientside'),
    Neo4jModule.forRoot({
      scheme: process.env.NEO4J_SCHEME as Neo4jScheme,
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,}),
    UserModule, AuthModule, EnemyModule, ItemModule, BiomeModule
  ],
  controllers: [AppController, UserController, EnemyController, ItemController, AuthController, BiomeController],
  providers: [AppService],
})
export class AppModule {}
