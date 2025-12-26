import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatPlayground } from './feat-playground';

describe('FeatPlayground', () => {
  let component: FeatPlayground;
  let fixture: ComponentFixture<FeatPlayground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatPlayground],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatPlayground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
