import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAssessmentsComponent } from './past-assessments.component';

describe('PastAssessmentsComponent', () => {
  let component: PastAssessmentsComponent;
  let fixture: ComponentFixture<PastAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastAssessmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
