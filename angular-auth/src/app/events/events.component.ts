import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/events/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events = []

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(res => {
      this.events = res
    }, error => {
      console.log(error)
    })
  }



}
