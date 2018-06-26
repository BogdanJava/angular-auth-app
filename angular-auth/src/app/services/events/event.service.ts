import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(`${this.url}/events`)
  }

  getSpecialEvents(): Observable<any> {
    return this.http.get(`${this.url}/special`)
  }
}
