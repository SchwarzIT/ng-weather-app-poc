import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let auth: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  before(() => {
    getTestBed().resetTestEnvironment();
    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
    );

    getTestBed().configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: AuthService, useClass: AuthService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    auth = getTestBed().inject(AuthService);
    httpMock = getTestBed().inject(HttpTestingController);
    httpClient = getTestBed().inject(HttpClient);
  });

  describe('login', () => {
    beforeEach(() => {
      cy.spy(auth.auth0, 'authorize');
      auth.login();
    });

    it('should call authorize from auth0 ', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        expect(auth.auth0.authorize).to.have.been.called;
      } catch (e) {
        expect(e).to.match('Not authorized!');
      }
    });
  });

  describe('handleLoginCallback', () => {
    beforeEach(() => {
      cy.spy(auth.auth0, 'parseHash');
      auth.handleLoginCallback();
    });

    it('should call parseHash from auth0', () => {

      it('should call parseHash from auth0 and return result', () => {
        const authResult = {
          accessToken: 'TOKEN',
        };
        expect(auth.auth0.parseHash).to.have.been.called.and.returned(authResult);

        if (authResult && authResult.accessToken) {
          const spyGetUserInfo = cy.spy(auth, 'getUserInfo');
          // tslint:disable-next-line:no-unused-expression
          expect(spyGetUserInfo).to.have.been.called;
        }
      });

      it('should call parseHash from auth0 and throw an error', () => {
        const err = {
          error: 'error',
        };
        expect(auth.auth0.parseHash).to.have.been.called.and.returned(err);
        expect(window.alert).to.have.been.called.with(`Error: ${err.error}. Check the console for further details.`);
      });
    });
  });
});
