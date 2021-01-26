import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {AUTH_CONFIG} from '../../../auth_config';
import {User} from '../models/user.model';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    this.getAccessToken();
  }

  get userProfile(): User {
    return {
      picture: window.localStorage.getItem('user_picture'),
      name: window.localStorage.getItem('user_name'),
      email: window.localStorage.getItem('user_email'),
    };
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < JSON.parse(window.localStorage.getItem('expires_at'));
  }

  tokenRenewalTimeout: number;
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientId,
    domain: AUTH_CONFIG.domain,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.redirect,
    scope: AUTH_CONFIG.scope
  });

  private setSessionToLocalStorage(authResult, profile) {
    // Save authentication data and update login status subject
    window.localStorage.setItem('user_picture', profile.picture);
    window.localStorage.setItem('user_name', profile.name);
    window.localStorage.setItem('user_email', profile.email);
    window.localStorage.setItem('access_token', authResult.accessToken);
    window.localStorage.setItem('expires_at', JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    ));

    // schedule a token renewal
    this.scheduleRenewal();
  }

  login() {
    // Auth0 authorize request
    try {
      this.auth0.authorize();
    } catch (e) {
      throw new Error('Not authorized!');
    }
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
      this.router.navigate(['/']);
    });
  }

  private getAccessToken() {
    if (window.localStorage.getItem('access_token') === null) {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken) {
          this.getUserInfo(authResult);
        } else {
          console.warn(`Could not get a token (${err.error}: ${err.error_description}).`);
          this.clearStoredData();
        }
      });
    }
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.getAccessToken();
      }, delay);
    }
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSessionToLocalStorage(authResult, profile);
      }
    });

  }

  logout() {
    // Log out of Auth0 session
    this.auth0.logout({
      returnTo: AUTH_CONFIG.returnTo,
      clientID: AUTH_CONFIG.clientId
    });

    this.clearStoredData();
    clearTimeout(this.tokenRenewalTimeout);
  }

  clearStoredData() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('expires_at');
    window.localStorage.removeItem('user_picture');
    window.localStorage.removeItem('user_name');
    window.localStorage.removeItem('user_email');
  }
}
