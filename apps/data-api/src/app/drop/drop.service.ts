import { Injectable } from '@nestjs/common';

@Injectable()
export class DropService {
    constructor() {
        // Initialization logic if needed
    }

    // Example method
    getDrops(): string[] {
        return ['Drop 1', 'Drop 2', 'Drop 3'];
    }
}