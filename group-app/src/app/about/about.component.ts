import { Component, inject, OnInit, signal } from '@angular/core';


@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  title = 'About Us';
  description = 'Meet our Team of Web Dev Experts';
}
