import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatExercises } from './feat-exercises';

describe('FeatExercises', () => {
  let component: FeatExercises;
  let fixture: ComponentFixture<FeatExercises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatExercises],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatExercises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
