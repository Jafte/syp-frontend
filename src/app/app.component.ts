import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.model'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'syp-front';
  currentUser: User | null = null;
  isCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Подписываемся на изменения пользователя
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
