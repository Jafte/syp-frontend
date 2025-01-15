import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friends',
  imports: [RouterLink],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {
  friends: Array<User> | null = null;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.loadFriends();
  }
  
  loadFriends() {
    this.userService.getFriends().subscribe((user_list: Array<User>) => this.friends = user_list)
  }
  
}
