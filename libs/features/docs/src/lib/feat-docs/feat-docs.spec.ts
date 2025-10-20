import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatDocs } from './feat-docs';

describe('FeatDocs', () => {
  let component: FeatDocs;
  let fixture: ComponentFixture<FeatDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatDocs],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
