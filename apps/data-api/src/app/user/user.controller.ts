import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getAllUsers(): string {
        return 'This action returns all users';
    }

    @Get(':id')
    getUserById(@Param('id') id: string): string {
        return `This action returns user with id: ${id}`;
    }

    @Post()
    createUser(@Body() createUserDto: any): string {
        return 'This action creates a new user';
    }
}