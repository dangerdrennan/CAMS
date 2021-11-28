import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOutcomesComponent } from './change-outcomes.component';

describe('ChangeOutcomesComponent', () => {
  let component: ChangeOutcomesComponent;
  let fixture: ComponentFixture<ChangeOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
