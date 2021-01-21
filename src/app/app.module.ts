import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {SchwarzCoreUIModule} from '@scu/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CallbackComponent} from './components/callback/callback.component';
import {CountryExtensionContainerComponent} from './components/country-extension-container/country-extension-container.component';
import {CountryListComponent} from './components/country-list/country-list.component';
import {CustomExtensionComponent} from './components/custom-extension/custom-extension.component';
import {GreetingComponent} from './components/greeting/greeting.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    HomeComponent,
    CountryListComponent,
    CallbackComponent,
    CountryExtensionContainerComponent,
    CustomExtensionComponent,
    GreetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SchwarzCoreUIModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
