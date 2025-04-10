import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '@avans-nx-workshop/shared/api';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(): Promise<any[]> {
        return this.userService.getAllUsers();
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string,@Body() updateData: Partial<User>,) {
      return this.userService.update(id, updateData);
    }

    // Delete user
    @Delete(':id')
    async deleteUser(@Param('id') id: string,) {
      return this.userService.delete(id);
    }

    // Get user by name
    @Get('name/:name')
    async getUserByName(@Param('name') name: string): Promise<User> {
        return this.userService.getByName(name);
    }

    @Post()
    create(@Body() body: any) {
      return this.userService.create(body);
    }
}