import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardFeeSheetListComponent } from './standard-fee-sheet-list.component';

describe('StandardFeeSheetListComponent', () => {
  let component: StandardFeeSheetListComponent;
  let fixture: ComponentFixture<StandardFeeSheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardFeeSheetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardFeeSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
