import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { IndexComponent } from './pages/index/index.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { FriendsComponent } from './user/friends/friends.component';
import { EventsComponent } from './user/events/events.component';
import { FriendRequestsComponent } from './user/friend-requests/friend-requests.component';
import { NewEventComponent } from './user/events/new.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], title: 'Профиль', children: [
    {
      path: 'friends',
      title: 'Друзья',
      component: FriendsComponent,
    },
    {
      path: 'friends/requests',
      title: 'Заявки в друзья',
      component: FriendRequestsComponent,
    },
    {
      path: 'events',
      title: 'События',
      component: EventsComponent,
    },
    {
      path: 'events/add',
      title: 'Новое событие',
      component: NewEventComponent,
    },
    {
      path: 'profile',
      title: 'Профиль',
      component: DashboardComponent,
    },
    {
      path: ':uuid',
      title: 'Профиль',
      component: DashboardComponent,
    },
  ],
},
{ path: 'login', component: LoginComponent, title: 'Вход' },
{ path: 'logout', component: LogoutComponent, canActivate: [AuthGuard], title: 'Выход' },
{ path: '', component: IndexComponent, title: 'Добро пожаловать' },
];
