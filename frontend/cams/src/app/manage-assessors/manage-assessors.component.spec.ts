import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssessorsComponent } from './manage-assessors.component';

describe('ManageAssessorsComponent', () => {
  let component: ManageAssessorsComponent;
  let fixture: ComponentFixture<ManageAssessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAssessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
