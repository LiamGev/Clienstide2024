import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '@avans-nx-workshop/shared/api'; // jouw model

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ results: User[] }>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.apiUrl}/username/${username}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getAuthHeaders() });
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
