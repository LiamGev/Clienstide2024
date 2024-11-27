import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Enemy } from '../model/enemy.interface';  // Import your updated Enemy interface

@Injectable({
  providedIn: 'root',
})
export class EnemyService {
  private baseUrl = 'https://api.example.com/enemies'; // Mock or real API endpoint
  private enemies: Enemy[] = [];
  private nextId: number = 1;

  constructor(private http: HttpClient) {
    // Mocked enemy data for demonstration purposes
    this.enemies = [
      { enemyId: 1, name: 'Goblin', health: 50, damage: 10, class: 'Warrior', type: 'Beast' },
      { enemyId: 2, name: 'Orc', health: 150, damage: 30, class: 'Brute', type: 'Beast' },
      { enemyId: 3, name: 'Dragon', health: 500, damage: 100, class: 'Mythical', type: 'Dragon' },
      { enemyId: 4, name: 'Troll', health: 200, damage: 40, class: 'Brute', type: 'Giant' },
      { enemyId: 5, name: 'Vampire', health: 120, damage: 50, class: 'Stealth', type: 'Undead' },
    ];
    this.nextId = this.enemies.length + 1;
  }

  // Get a list of enemies
  getEnemies(): Observable<Enemy[]> {
    return of(this.enemies); // Return mocked data
  }

  // Get a specific enemy by ID
  getEnemyById(id: number): Observable<Enemy> {
    const enemy = this.enemies.find((e) => e.enemyId === id);
    if (!enemy) {
      throw new Error(`Enemy with id ${id} not found`);
    }
    return of(enemy);
  }

  // Create a new enemy
  createEnemy(enemy: Enemy): Observable<void> {
    const newEnemy = { ...enemy, enemyId: this.nextId++ };
    this.enemies.push(newEnemy);
    console.log('New Enemy Created:', newEnemy);
    return of(undefined);
  }

  // Update an existing enemy
  updateEnemy(id: number, enemy: Enemy): Observable<void> {
    const index = this.enemies.findIndex((e) => e.enemyId === id);
    if (index !== -1) {
      this.enemies[index] = enemy;
    }
    return of(undefined);
  }

  // Delete an enemy
  deleteEnemy(id: number): Observable<void> {
    const index = this.enemies.findIndex((e) => e.enemyId === id);
    if (index !== -1) {
      this.enemies.splice(index, 1);
    }
    return of(undefined);
  }

  // You can replace these with real API calls if needed
  // getEnemies(): Observable<Enemy[]> {
  //   return this.http.get<Enemy[]>(this.baseUrl);
  // }

  // getEnemyById(id: number): Observable<Enemy> {
  //   return this.http.get<Enemy>(`${this.baseUrl}/${id}`);
  // }

  // createEnemy(enemy: Enemy): Observable<Enemy> {
  //   return this.http.post<Enemy>(this.baseUrl, enemy);
  // }

  // updateEnemy(id: number, enemy: Enemy): Observable<Enemy> {
  //   return this.http.put<Enemy>(`${this.baseUrl}/${id}`, enemy);
  // }

  // deleteEnemy(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
