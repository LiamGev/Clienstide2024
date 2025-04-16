import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'libs/shared/api/src/lib/model/user.interface';
import { UserService } from '@project/frontend-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  user: Partial<User> = {
    name: '',
    email: '',
    password: '',
    role: [],
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  onSubmit(): void {
    if (this.user._id) {
      this.userService.updateUser(this.user._id, this.user as User).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      const { _id, ...newUser } = this.user;
      this.userService.createUser(newUser as User).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
