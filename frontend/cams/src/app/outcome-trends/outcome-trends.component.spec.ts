import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeTrendsComponent } from './outcome-trends.component';

describe('OutcomeTrendsComponent', () => {
  let component: OutcomeTrendsComponent;
  let fixture: ComponentFixture<OutcomeTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeTrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomeTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
