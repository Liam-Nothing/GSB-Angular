import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardFeesComponent } from './add-standard-fees.component';

describe('AddStandardFeesComponent', () => {
  let component: AddStandardFeesComponent;
  let fixture: ComponentFixture<AddStandardFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStandardFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandardFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
