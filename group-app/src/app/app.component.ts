import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent],
  template: `
    <app-nav />

    <main>
      <app-home />
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MJIT LLC';
}