import { Controller, Get } from '@nestjs/common';

@Controller('enemy')
export class EnemyController {
    @Get()
    findAll(): string {
        return 'This action returns all enemies';
    }
}