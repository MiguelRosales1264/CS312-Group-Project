import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav></app-nav>

    <h2>Welcome to {{ title }}!</h2>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, qui nostrum odio vel alias, at ex eius voluptatum eligendi fugit perferendis consequuntur voluptate quibusdam doloremque, reprehenderit iste! Doloremque, sapiente quam!</p>

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MJIT LLC';
}