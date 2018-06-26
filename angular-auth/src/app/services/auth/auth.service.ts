import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "http://localhost:3000/api";

  constructor(private http: HttpClient, private router: Router) {}

  public registerUser(user): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  public loginUser(user): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public logoutUser() {
    localStorage.removeItem("token");
    this.router.navigate(['/login'])
  }
}
