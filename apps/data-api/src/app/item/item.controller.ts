import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@avans-nx-workshop/shared/api';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createItem(@Body() item: Item, @Request() req: any) {
        console.log('req.user:', req.user);
        const currentUserId = req.user.sub; // Extract the user ID from the request
        return this.itemService.create(item, currentUserId);
    }
  
    @UseGuards(AuthGuard)
    @Get()
    async getAllItems() {
      return this.itemService.getAll();
    }
  
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateItem(@Param('id') id: string,@Body() updateData: Partial<Item>,@Request() req: any,) {
    const currentUserId = req.user.sub;
    return this.itemService.update(id, updateData, currentUserId);
    }
  
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteItem(@Param('id') id: string,@Request() req: any,) {
    const currentUserId = req.user.sub;
    return this.itemService.delete(id, currentUserId);
    }
}