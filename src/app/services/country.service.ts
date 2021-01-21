import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  BASE_URL = `http://localhost:8082/api/countries`;

  constructor(private apiService: HttpClient) {
  }

  getAllCountries(): Observable<Country[]> {
    return this.apiService.get<Country[]>(this.BASE_URL);
  }
}
