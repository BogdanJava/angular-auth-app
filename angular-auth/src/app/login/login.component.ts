import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginUserData = {};

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  public loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      result => {
        localStorage.setItem("token", result.token);
        console.log(result);
        this.router.navigate(['/special'])
      },
      error => {
        console.log(error);
      }
    );
  }
}
