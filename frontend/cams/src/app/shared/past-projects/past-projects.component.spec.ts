import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastProjectsComponent } from './past-projects.component';

describe('PastProjectsComponent', () => {
  let component: PastProjectsComponent;
  let fixture: ComponentFixture<PastProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
