import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {
  @Input() iso: string;
  nativeGreeting: string;

  constructor() {
  }

  ngOnInit(): void {
    this.nativeGreeting = this.translateGreeting();
  }

  translateGreeting(): string {
    switch (this.iso) {
      case 'BG':
        return 'Добре дошли в България!';
      case 'DE':
        return 'Willkommen in Deutschland!';
      case 'FR':
        return 'Bienvenue en France!';
      default:
        return 'No available country';
    }
  }
}
