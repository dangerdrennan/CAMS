import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCompletedComponent } from './assessment-completed.component';

describe('AssessmentCompletedComponent', () => {
  let component: AssessmentCompletedComponent;
  let fixture: ComponentFixture<AssessmentCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
