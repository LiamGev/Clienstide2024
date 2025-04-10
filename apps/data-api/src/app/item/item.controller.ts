import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@avans-nx-workshop/shared/api';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    async createItem(@Body() item: Item) {
      return this.itemService.create(item);
    }
  
    @Get()
    async getAllItems() {
      return this.itemService.getAll();
    }
  
    @Patch(':id')
    async updateItem(@Param('id') id: string,@Body() updateData: Partial<Item>,) {
      return this.itemService.update(id, updateData);
    }
  
    @Delete(':id')
    async deleteItem(@Param('id') id: string) {
      return this.itemService.delete(id);
    }
}