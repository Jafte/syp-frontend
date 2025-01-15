import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewEventComponent {
  eventForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      started_at: [''],
      ended_at: [''],
      location: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.eventForm.valid) {
      const {title, description, started_at, ended_at, location} = this.eventForm.value;
      this.userService.createUserEvent(title, description, started_at, ended_at, location).subscribe({
        next: (event) => {
          console.log('Событие создано', event);
          this.router.navigate(['/user/events']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
