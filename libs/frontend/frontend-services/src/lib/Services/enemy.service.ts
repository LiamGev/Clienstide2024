import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enemy } from '@avans-nx-workshop/shared/api'; // jouw model

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  private apiUrl = 'http://localhost:3000/api/enemy';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllEnemies(): Observable<Enemy[]> {
    return this.http.get<{ results: Enemy[] }>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getEnemyById(id: string): Observable<Enemy> {
    return this.http.get<{ results: Enemy }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createEnemy(enemy: Enemy): Observable<Enemy> {
    return this.http.post<Enemy>(this.apiUrl, enemy, { headers: this.getAuthHeaders() });
  }

  updateEnemy(id: string, enemy: Partial<Enemy>): Observable<Enemy> {
    return this.http.patch<Enemy>(`${this.apiUrl}/${id}`, enemy, { headers: this.getAuthHeaders() });
  }

  deleteEnemy(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
