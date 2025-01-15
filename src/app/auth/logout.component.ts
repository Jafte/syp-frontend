import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  authForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      logoutall: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.authForm.valid) {
      const { logoutall} = this.authForm.value;
      this.authService.logout(logoutall).subscribe({
        next: () => {
          console.log('Авторизация успешна!');
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
