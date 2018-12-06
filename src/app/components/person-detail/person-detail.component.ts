import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonService } from '../../services/person.services';

import { Person } from '../../models/person';

/**
 * Компонент для отображения информации о болельщике.
 */
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  constructor(private route: ActivatedRoute, private location: Location, private personService: PersonService) { }

  ngOnInit() {
    this.person = this.personService.getPerson();
    if (!this.person) {
      this.location.back();
    }
  }
}
