import { Component, OnInit } from "@angular/core";
import { EventService } from "../services/events/event.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-special-events",
  templateUrl: "./special-events.component.html",
  styleUrls: ["./special-events.component.css"]
})
export class SpecialEventsComponent implements OnInit {
  public specialEvents = [];

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getSpecialEvents().subscribe(
      res => {
        this.specialEvents = res;
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login'])
          }
          if (error.status === 403) {
            console.error('Token is corrupted')
            this.router.navigate(['/login'])
          }
        }
      }
    );
  }
}
