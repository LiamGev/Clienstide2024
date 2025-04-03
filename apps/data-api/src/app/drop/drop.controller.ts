import { Controller, Get } from '@nestjs/common';

@Controller('drop')
export class DropController {
    @Get()
    getAllDrops(): string {
        return 'This action returns all drops';
    }
}