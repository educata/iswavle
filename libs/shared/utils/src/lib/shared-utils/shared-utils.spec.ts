import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUtils } from './shared-utils';

describe('SharedUtils', () => {
  let component: SharedUtils;
  let fixture: ComponentFixture<SharedUtils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUtils],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUtils);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
