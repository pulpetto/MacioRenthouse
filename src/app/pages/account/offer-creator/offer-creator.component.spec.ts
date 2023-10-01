import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCreatorComponent } from './offer-creator.component';

describe('OfferCreatorComponent', () => {
  let component: OfferCreatorComponent;
  let fixture: ComponentFixture<OfferCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferCreatorComponent]
    });
    fixture = TestBed.createComponent(OfferCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
