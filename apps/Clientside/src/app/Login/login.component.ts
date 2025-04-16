import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule , CommonModule, RouterModule],
})
export class LoginComponent {
    email = '';
    password = '';
    errorMessage = '';
  
    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        const token = localStorage.getItem('token');
        if (token) {
          this.router.navigate(['/home']);
        }
      }
  
    onSubmit() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.http.post<any>('http://localhost:3000/api/auth/login', {
        email: this.email,
        pass: this.password,
      }).subscribe({
        next: (response) => {
          console.log('Login success, token:', response.results.access_token);
          localStorage.setItem('token', response.results.access_token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Check your email/password.';
          console.error(err);
        }
      });
    }  
  }