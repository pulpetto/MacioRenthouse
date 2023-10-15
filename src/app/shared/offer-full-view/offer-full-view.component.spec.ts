import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFullViewComponent } from './offer-full-view.component';

describe('OfferFullViewComponent', () => {
  let component: OfferFullViewComponent;
  let fixture: ComponentFixture<OfferFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferFullViewComponent]
    });
    fixture = TestBed.createComponent(OfferFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
