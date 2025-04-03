import { Controller, Get } from '@nestjs/common';

@Controller('item')
export class ItemController {
    @Get()
    findAll(): string {
        return 'This action returns all items';
    }
}