import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuboutcomeUpdateDisplayComponent } from './suboutcome-update-display.component';

describe('SuboutcomeUpdateDisplayComponent', () => {
  let component: SuboutcomeUpdateDisplayComponent;
  let fixture: ComponentFixture<SuboutcomeUpdateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuboutcomeUpdateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuboutcomeUpdateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
