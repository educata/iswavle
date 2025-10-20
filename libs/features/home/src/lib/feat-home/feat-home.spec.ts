import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatHome } from './feat-home';

describe('FeatHome', () => {
  let component: FeatHome;
  let fixture: ComponentFixture<FeatHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatHome],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
