import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CountiesService } from '../../services/counties.services';
import { PersonService } from '../../services/person.services';

import { Сountry } from '../../models/country';
import { Person } from '../../models/person';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Компонент для добавления болельщика.
 */
@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personEditForm: FormGroup;
  countries$: Observable<Сountry[]>;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private countiesService: CountiesService,
    private personService: PersonService) {
    this.personEditForm = formBuilder.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.countries$ = this.countiesService.getСountries()
      .pipe(tap(() => this.isLoading = false));
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.personEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    const controls = this.personEditForm.controls;

    /** Проверяем форму на валидность */
    if (this.personEditForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }

    this.personService.addPerson(<Person>this.personEditForm.value);
    this.router.navigate(['/person']);
  }
}
