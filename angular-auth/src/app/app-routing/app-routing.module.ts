import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { EventsComponent } from "../events/events.component";
import { SpecialEventsComponent } from "../special-events/special-events.component";
import { RegisterComponent } from "../register/register.component";
import { AuthGuard } from "../guard/auth.guard";

const routes: Route[] = [
  { path: "", redirectTo: "/events", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "events", component: EventsComponent },
  {
    path: "special",
    component: SpecialEventsComponent,
    canActivate: [AuthGuard]
  },
  { path: "register", component: RegisterComponent }
];

export const routerComponents = [
  LoginComponent,
  EventsComponent,
  SpecialEventsComponent,
  RegisterComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
