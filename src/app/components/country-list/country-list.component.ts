import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Country} from '../../models/country.model';
import {CountryService} from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  currentCountries$: Observable<Country[]>;

  constructor(public countryService: CountryService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.currentCountries$ = this.countryService.getAllCountries();
  }

  goToCityList(iso: string): Promise<boolean> {
    return this.router.navigate(['/city-list/', iso]);
  }

  goToCountryExtension(iso: string): Promise<boolean> {
    return this.router.navigate(['/country-list/', iso]);
  }
}
