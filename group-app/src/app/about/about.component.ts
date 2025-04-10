import { Component, inject, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  aboutService = inject(AboutService);

  ngOnInit(): void {
    console.log(this.aboutService.aboutPersons);
  }
}
