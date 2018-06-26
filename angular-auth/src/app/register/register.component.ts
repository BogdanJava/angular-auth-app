import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public registerUserData = {};

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  public registerUser(): void {
    this.authService.registerUser(this.registerUserData).subscribe(
      result => {
        localStorage.setItem("token", result.token);
        console.log(result);
        this.router.navigate(["/special"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
