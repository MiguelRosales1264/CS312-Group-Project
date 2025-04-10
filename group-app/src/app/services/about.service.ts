import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  aboutPersons: Array<Person> = [
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
      name: 'Miguel Rosales',
      description: 'Miguel is a software engineer with a passion for web development and open source projects.'
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/7654321?v=4',
      name: 'John Doe',
      description: 'John Doe Description here.'
    },
  ];

  constructor() { }
}
