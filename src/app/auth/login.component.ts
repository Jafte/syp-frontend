import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      this.authService.login(username, password).subscribe({
        next: (user) => {
          console.log('Авторизация успешна!', user);
          this.router.navigate(['/user/profile']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
