import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {initEnv, mount} from 'cypress-angular-unit-test';
import {AuthService} from '../../services/auth.service';
import {HomeComponent} from './home.component';

describe('Home Unit Tests', () => {

  beforeEach(() => {
    initEnv(HomeComponent, {
      imports: [RouterTestingModule],
      providers: [AuthService, RouterLink],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should create', () => {
    const fixture = mount(HomeComponent, {title: 'Angular Weather App'});
    fixture.detectChanges();
  });

  it('shows message to guide to login', () => {
    mount(HomeComponent, {title: 'Angular Weather App'});

    cy.contains('Please, Log in by clicking on the button above to proceed!');
  });
})
;
