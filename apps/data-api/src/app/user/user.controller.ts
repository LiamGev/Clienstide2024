import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '@avans-nx-workshop/shared/api';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    getAllUsers(): Promise<any[]> {
        return this.userService.getAllUsers();
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: string,@Body() updateData: Partial<User>,) {
      return this.userService.update(id, updateData);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string,) {
      return this.userService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get('name/:name')
    async getUserByName(@Param('name') name: string): Promise<User> {
        return this.userService.getByName(name);
    }

    @Post()
    create(@Body() body: any) {
      return this.userService.create(body);
    }
}