import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  AppRoutingModule,
  routerComponents as routes
} from "./app-routing/app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TokenInterceptorService } from "./filter/token-interceptor/token-interceptor.service";

@NgModule({
  declarations: [AppComponent, routes],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
