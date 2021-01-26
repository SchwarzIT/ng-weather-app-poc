import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isObservable} from 'rxjs/';
import {City} from '../../models/city.model';
import {Landmark} from '../../models/landmark.model';
import {CityService} from '../../services/city.service';
import {LandmarkService} from '../../services/landmark.service';

@Component({
  selector: 'app-custom-extension',
  templateUrl: './custom-extension.component.html',
  styleUrls: ['./custom-extension.component.scss']
})
export class CustomExtensionComponent implements OnInit {
  @Input() extension: City[] | Landmark[];
  @Input() extensionType;
  @Input() iso: string;
  @Output() addCustomItem: EventEmitter<string[]> = new EventEmitter<string[]>();
  input: string;

  constructor(public cityService: CityService,
              public landmarkService: LandmarkService) {
  }

  ngOnInit(): void {
    console.log(this.extensionType);
  }

  addItem(): void {
    this.addCustomItem.emit([this.extensionType, this.input]);
  }
}
