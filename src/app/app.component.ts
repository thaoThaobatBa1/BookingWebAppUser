import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'AppBooking';
}
