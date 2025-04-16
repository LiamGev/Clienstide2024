import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';


@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]), Neo4jModule],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}