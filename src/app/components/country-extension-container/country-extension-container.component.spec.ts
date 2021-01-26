import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryExtensionContainerComponent } from './country-extension-container.component';

describe('CountryExtensionContainerComponent', () => {
  let component: CountryExtensionContainerComponent;
  let fixture: ComponentFixture<CountryExtensionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryExtensionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryExtensionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
