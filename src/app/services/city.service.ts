import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {City} from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  BASE_URL = `http://localhost:8081/api/cities`;

  constructor(private apiService: HttpClient) {
  }

  getAllCitiesByCountry(iso: string): Observable<City[]> {
    iso = iso.trim();

    const options = iso ?
      {params: new HttpParams().set('country', iso)} : {};

    // ex.: http://localhost:8081/api/cities?country=BG
    return this.apiService.get<City[]>(this.BASE_URL, options);
  }

  addNewCityToCountry(iso: string, newCity: City): Observable<City> {
    // ex.: http://localhost:8081/api/cities?country=BG

    const options = iso ?
      {
        params: new HttpParams()
          .set('country', iso)
      } : {};

    return this.apiService
      .post<City>(this.BASE_URL, newCity, options);
  }
}
