import { Injectable } from '@nestjs/common';

@Injectable()
export class EnemyService {
    private enemies: string[] = [];

    getAllEnemies(): string[] {
        return this.enemies;
    }

    addEnemy(enemy: string): void {
        this.enemies.push(enemy);
    }

    removeEnemy(enemy: string): boolean {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
            return true;
        }
        return false;
    }
}