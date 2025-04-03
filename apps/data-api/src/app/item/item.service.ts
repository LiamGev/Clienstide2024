import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
    private items: any[] = [];

    findAll(): any[] {
        return this.items;
    }

    findOne(id: string): any {
        return this.items.find(item => item.id === id);
    }

    create(item: any): void {
        this.items.push(item);
    }

    update(id: string, updatedItem: any): void {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = updatedItem;
        }
    }

    delete(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }
}