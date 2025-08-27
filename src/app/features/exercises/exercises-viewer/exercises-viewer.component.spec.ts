import { ComponentFixture, TestBed } from '@angular/core/testing';

import exercisesViewerComponent from './exercises-viewer.component';

describe('exercisesViewerComponent', () => {
  let component: exercisesViewerComponent;
  let fixture: ComponentFixture<exercisesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [exercisesViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(exercisesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
