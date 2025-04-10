import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  aboutPersons: Array<Person> = [
    {
      name: 'Miguel Rosales',
      description: 'Miguel is a software engineer with a passion for web development and open source projects.'
    },
    {
      name: 'John Doe',
      description: 'John Doe Description here.'
    },
  ];

  constructor() { }
}
