import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  aboutPersons: Array<Person> = [];

  constructor() { }
}
