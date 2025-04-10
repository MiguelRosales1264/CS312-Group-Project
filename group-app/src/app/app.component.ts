import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav title />

    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MJIT LLC';
}