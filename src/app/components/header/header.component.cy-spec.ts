import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {initEnv, mount} from 'cypress-angular-unit-test';
import {AuthService} from '../../services/auth.service';
import {HeaderComponent} from './header.component';

describe('HeaderComponent Unit Tests', () => {
  beforeEach(() => {
    initEnv(HeaderComponent, {
      imports: [RouterTestingModule],
      providers: [AuthService, RouterLink],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('should create', () => {
    const fixture = mount(HeaderComponent);
    fixture.detectChanges();
  });

  it('shows the title on the left corner on the top', () => {
    mount(HeaderComponent, {title: 'Angular Weather App'});

    cy.contains('Angular Weather App');
  });
});
