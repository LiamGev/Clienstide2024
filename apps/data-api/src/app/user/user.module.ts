import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';


@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),Neo4jModule,],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}