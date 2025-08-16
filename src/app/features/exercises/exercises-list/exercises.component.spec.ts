import { ComponentFixture, TestBed } from '@angular/core/testing';

import exercisesComponent from './exercises.component';

describe('exercisesComponent', () => {
  let component: exercisesComponent;
  let fixture: ComponentFixture<exercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [exercisesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(exercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
