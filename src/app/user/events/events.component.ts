import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { UserEvent } from './events.model';

@Component({
  selector: 'app-events',
  imports: [RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events: Array<UserEvent> | null = null;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.loadEvents();
  }
  
  loadEvents() {
    this.userService.getUserEvents().subscribe((events_list: Array<UserEvent>) => this.events = events_list)
  }
  
}