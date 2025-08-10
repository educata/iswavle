import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciesesViewerComponent } from './exercieses-viewer.component';

describe('ExerciesesViewerComponent', () => {
  let component: ExerciesesViewerComponent;
  let fixture: ComponentFixture<ExerciesesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciesesViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciesesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
