import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundSimpleComponent } from './playground-simple.component';

describe('PlaygroundSimpleComponent', () => {
  let component: PlaygroundSimpleComponent;
  let fixture: ComponentFixture<PlaygroundSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaygroundSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
