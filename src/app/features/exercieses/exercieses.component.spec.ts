import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciesesComponent } from './exercieses.component';

describe('ExerciesesComponent', () => {
  let component: ExerciesesComponent;
  let fixture: ComponentFixture<ExerciesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciesesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
