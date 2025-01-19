import { Component, inject, TemplateRef } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.model'; 
import { WebAppService } from './webapp.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'syp-front';
  currentUser: User | null = null;
  private offcanvasService = inject(NgbOffcanvas);
  private authService = inject(AuthService);
  private router = inject(Router);
  private webAppService = inject(WebAppService);

  ngOnInit(): void {
    // Подписываемся на изменения пользователя
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
    const initDataUnsafe = this.webAppService.getAppInitDataUnsafe();
    if (initDataUnsafe.start_param) {
      const tg_action = initDataUnsafe.start_param.split("_", 2);
      if (tg_action[0] == "user" && tg_action[1]) {
        this.router.navigate(["/user/" + tg_action[1]]);
      }
      if (tg_action[0] == "event" && tg_action[1]) {
        this.router.navigate(["/event/" + tg_action[1]]);
      }
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.offcanvasService.dismiss();
      }
    })
  }

  openOffcanvas(content: TemplateRef<any>) {
		this.offcanvasService.open(content);
	}
}
