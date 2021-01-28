import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {City} from '../../models/city.model';
import {Landmark} from '../../models/landmark.model';
import {CityService} from '../../services/city.service';
import {LandmarkService} from '../../services/landmark.service';

@Component({
  selector: 'app-country-extension-container',
  templateUrl: './country-extension-container.component.html',
  styleUrls: ['./country-extension-container.component.scss']
})
export class CountryExtensionContainerComponent implements OnInit {
  @Output() iso: string;
  cityItems$: Observable<any[]>;
  landmarkItems$: Observable<any[]>;

  constructor(private route: ActivatedRoute,
              public cityService: CityService,
              public landmarkService: LandmarkService) {

    this.iso = this.route.snapshot.paramMap.get('iso');
  }

  ngOnInit(): void {
    this.loadAllExtensions();
  }

  private loadAllExtensions(): void {
    this.cityItems$ = this.cityService
      .getAllCitiesByCountry(this.iso);

    this.landmarkItems$ = this.landmarkService
      .getAllLandmarksByCountry(this.iso);
  }

  addItem($event: string[]): void {
    const extensionType = $event[0];
    const item = $event[1];

    switch (extensionType) {
      case 'CITY':
        const inputData = item.split(' ');
        const newCity: City = {
          name: inputData[0],
          temperature: Number(inputData[1]),
          country: this.iso
        };

        this.cityService
          .addNewCityToCountry(this.iso, newCity)
          .subscribe(() => {
            this.cityItems$ = this.cityService
              .getAllCitiesByCountry(this.iso);
          });
        break;
      case 'LANDMARK':
        const newLandmark: Landmark = {
          name: item,
          country: this.iso
        };

        this.landmarkService
          .addNewLandmarkToCountry(this.iso, newLandmark)
          .subscribe(() => {
              this.landmarkItems$ = this.landmarkService
                .getAllLandmarksByCountry(this.iso);
            }
          );
        break;
    }

    console.log(`New ${$event[0].toLocaleLowerCase()} with data: ${$event[1].toLocaleUpperCase()} has been created for ${this.iso}!`);
  }
}
