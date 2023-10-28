import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersPreviewComponent } from './offers-preview.component';

describe('OffersPreviewComponent', () => {
  let component: OffersPreviewComponent;
  let fixture: ComponentFixture<OffersPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersPreviewComponent]
    });
    fixture = TestBed.createComponent(OffersPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
