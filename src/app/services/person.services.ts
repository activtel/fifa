import { Injectable } from '@angular/core';

import { Person } from '../models/person';

/**
 * Сервис для управления болельщиком.
 */
@Injectable({
  providedIn: 'root',
})
export class PersonService {
  person: Person;

  /**
  * Добавляет нового болельщика.
  *
  * @param person Информация о болельщике.
  */
  addPerson(person: Person): void {
    this.person = person;
  }

  /**
  * Возвращает информацию о болельщике
  *
  * @returns Информация о болельщике.
  */
  getPerson(): Person {
    return this.person;
  }
}
