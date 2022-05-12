import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSheetListComponent } from './fee-sheet-list.component';

describe('FeeSheetListComponent', () => {
  let component: FeeSheetListComponent;
  let fixture: ComponentFixture<FeeSheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeSheetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
