import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuboutcomeComponent } from './suboutcome.component';

describe('SuboutcomeComponent', () => {
  let component: SuboutcomeComponent;
  let fixture: ComponentFixture<SuboutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuboutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuboutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
