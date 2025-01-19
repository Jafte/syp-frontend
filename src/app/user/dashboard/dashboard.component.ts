import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard'
import { User, UserDetail } from '../user.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { WebAppService } from '../../webapp.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private userUUId = new BehaviorSubject<string | null>(null);
  user: UserDetail | null = null;
  currentUser: User | null = null;
  isShared: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private webAppService: WebAppService, private clipboard: ClipboardService) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (!user) {
        return
      }
      this.currentUser = user;
      console.log('currentUser', user);
    });
  }

  ngOnInit(): void {
    this.userUUId.subscribe((uuid) => {
      if (!uuid) {
        return
      }
      console.log('uuid', uuid);
      this.userService.getUser(uuid).subscribe((user: UserDetail) => this.setUserDetail(user))
    })

    let uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid && this.currentUser) {
      uuid = this.currentUser.uuid;
    }
    if (uuid) {
      this.userUUId.next(uuid)
    }
  }

  setUserDetail(user: UserDetail): void {
    console.log(`user загружен`);
    user.created_at = new Date(user.created_at);
    if (user.friendship) {
      user.friendship.created_at = new Date(user.friendship.created_at);
    }
    this.user = user;
  }

  removeFromFriends(userUUId: string | undefined): void {
    if (!userUUId) {
      return;
    }
    this.userService.removeUserFromFriends(userUUId).subscribe((user: UserDetail) => this.setUserDetail(user))
  }

  sendFriendRequest(userUUId: string | undefined): void {
    if (!userUUId) {
      return;
    }
    this.userService.sendFriendRequestToUser(userUUId).subscribe((user: UserDetail) => this.setUserDetail(user))
  }

  acceptFriendRequest(userUUId: string | undefined): void {
    if (!userUUId) {
      return;
    }
    this.userService.acceptUserFriendRequest(userUUId).subscribe((user: UserDetail) => this.setUserDetail(user))
  }

  rejectFriendRequest(userUUId: string | undefined): void {
    if (!userUUId) {
      return;
    }
    this.userService.rejectUserFriendRequest(userUUId).subscribe((user: UserDetail) => this.setUserDetail(user))
  }

  cancelFriendRequest(userUUId: string | undefined): void {
    if (!userUUId) {
      return;
    }
    this.userService.cancelFriendRequestToUser(userUUId).subscribe((user: UserDetail) => this.setUserDetail(user))
  }

  shareProfile() {
    this.clipboard.copy('https://t.me/ShareYourPlansBot?startapp=user_' + this.currentUser?.uuid);
    this.isShared = true;
  }

}
