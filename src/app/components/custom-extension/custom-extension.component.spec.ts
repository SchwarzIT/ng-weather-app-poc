import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExtensionComponent } from './custom-extension.component';

describe('CustomExtensionComponent', () => {
  let component: CustomExtensionComponent;
  let fixture: ComponentFixture<CustomExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomExtensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
