import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatNotFound } from './feat-not-found';

describe('FeatNotFound', () => {
  let component: FeatNotFound;
  let fixture: ComponentFixture<FeatNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatNotFound],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
