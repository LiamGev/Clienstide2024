import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from 'libs/shared/api/src/lib/model/user.interface';
import { UserService } from 'libs/shared/api/src/lib/Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => (this.users = data));
    console.log(this.users);
  }
  
  ngOnInit(): void {
  }
}