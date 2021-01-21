import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Landmark} from '../models/landmark.model';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  BASE_URL = `http://localhost:8083/api/landmarks`;

  constructor(private apiService: HttpClient) {
  }

  getAllLandmarksByCountry(iso: string): Observable<Landmark[]> {

    const options = iso ?
      {params: new HttpParams().set('country', iso)} : {};

    // ex.: http://localhost:8083/api/landmarks?country=BG
    return this.apiService.get<Landmark[]>(this.BASE_URL, options);
  }

  addNewLandmarkToCountry(iso: string, newLandmark: Landmark): Observable<Landmark> {
    // ex.: http://localhost:8083/api/landmarks?country=BG

    const options = iso ?
      {
        params: new HttpParams()
          .set('country', iso)
      } : {};

    return this.apiService
      .post<Landmark>(this.BASE_URL, newLandmark, options);
  }
}
