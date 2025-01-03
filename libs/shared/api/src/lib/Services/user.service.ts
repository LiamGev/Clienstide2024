import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private baseUrl = 'https://api.example.com/users'; // Mock of echte API
    private users: User[];
    private nextId: number = 1;
  
    constructor(private http: HttpClient) {
      this.users = [
        { id: '1', name: 'John Doe', email: 'johndoe@gmail.com', role: 'Admin', password: 'password' },
        { id: '2', name: 'Jane Smith', email: 'janesmith@gmail.com', role: 'User', password: 'password' },
        { id: '3', name: 'Alice Johnson', email: 'alicejohnson@gmail.com', role: 'User', password: 'password' },
        { id: '4', name: 'Bob Brown', email: 'bobbrown@gmail.com', role: 'User', password: 'password' },
        { id: '5', name: 'Charlie Davis', email: 'charliedavis@gmail.com', role: 'User', password: 'password' }
      ]
      this.nextId = this.users.length + 1;
    }
  
    getUsers(): Observable<User[]> {
      return of(this.users);
    }
  
    getUserById(id: string): Observable<User> {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return of(user);
    }
  
    createUser(user: User): Observable<void> {
      const newUser = { ...user, id: (this.nextId++).toString() };
      console.log(newUser);
      this.users.push(newUser);
      console.log(this.users);
      return of(undefined);
    }
  
    updateUser(id: string, user: User): Observable<void> {
      const index = this.users.findIndex((user) => user.id === id);
      this.users[index] = user;
      return of(undefined);
    }
  
    deleteUser(id: string): Observable<void> {
      const index = this.users.findIndex((user) => user.id === id);
      this.users.splice(index, 1);
      return of(undefined);
    }
  
    // getUsers(): Observable<User[]> {
    //   return this.http.get<User[]>(this.baseUrl);
    // }
  
    // getUserById(id: string): Observable<User> {
    //   return this.http.get<User>(`${this.baseUrl}/${id}`);
    // }
  
    // createUser(user: User): Observable<User> {
    //   return this.http.post<User>(this.baseUrl, user);
    // }
  
    // updateUser(id: string, user: User): Observable<User> {
    //   return this.http.put<User>(`${this.baseUrl}/${id}`, user);
    // }
  
    // deleteUser(id: string): Observable<void> {
    //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
    // }
}