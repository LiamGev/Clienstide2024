import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Drop, DropSchema } from "./schemas/drop.schema";
import { Item, ItemSchema } from "../item/schemas/item.schema";
import { Enemy, EnemySchema } from "../enemy/schemas/enemy.schema";
import { User, UserSchema } from "../user/schemas/user.schema";
import { DropController } from "./drop.controller";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Drop.name, schema: DropSchema },
        { name: Item.name, schema: ItemSchema },
        { name: Enemy.name, schema: EnemySchema },
        { name: User.name, schema: UserSchema },
    ])],
    controllers: [DropController],
    providers: [],
})
export class DropModule {}