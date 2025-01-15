import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FriendshipRequest, User } from '../user.model';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-friend-requests',
  imports: [RouterLink],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.css'
})
export class FriendRequestsComponent implements OnInit {
  requests: Array<FriendshipRequest> | null = null;
  currentUser: User | null = null;
  
  constructor(private authService: AuthService, private userService: UserService) {
      this.authService.getCurrentUser().subscribe((user) => {
        if (!user) {
          return
        }
        this.currentUser = user;
      });
    }
  
  ngOnInit(): void {
    this.loadFriendshipRequest();
  }
  
  loadFriendshipRequest() {
    this.userService.getFriendRequests().subscribe((request_list: Array<FriendshipRequest>) => this.requests = request_list)
  }

  getUserForCard(request: FriendshipRequest): User {
    if (request.receiver.uuid == this.currentUser?.uuid) {
      return request.sender;
    } else {
      return request.receiver;
    }
  }
  
}
