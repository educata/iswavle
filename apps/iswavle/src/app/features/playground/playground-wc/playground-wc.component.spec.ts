import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundWcComponent } from './playground-wc.component';

describe('PlaygroundWcComponent', () => {
  let component: PlaygroundWcComponent;
  let fixture: ComponentFixture<PlaygroundWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundWcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
