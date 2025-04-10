import { Component } from '@angular/core';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  providers: [ AboutService ],
})
export class AboutComponent {

}
