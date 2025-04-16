import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from '@project/libs/shared/api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/item';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<{ results: Item[] }>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<{ results: Item }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, { headers: this.getAuthHeaders() });
  }

  updateItem(id: string, item: Partial<Item>): Observable<Item> {
    return this.http.patch<Item>(`${this.apiUrl}/${id}`, item, { headers: this.getAuthHeaders() });
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
