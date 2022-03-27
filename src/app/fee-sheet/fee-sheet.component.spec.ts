import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSheetComponent } from './fee-sheet.component';

describe('FeeSheetComponent', () => {
  let component: FeeSheetComponent;
  let fixture: ComponentFixture<FeeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
