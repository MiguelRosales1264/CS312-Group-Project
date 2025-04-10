import { Component, inject, OnInit, signal } from '@angular/core';
import { AboutService } from '../services/about.service';
import { Person } from '../model/person.type';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  aboutService = inject(AboutService);
  aboutPersons = signal<Array<Person>>([]);

  ngOnInit(): void {
    this.aboutPersons.set(this.aboutService.aboutPersons);
  }
}
