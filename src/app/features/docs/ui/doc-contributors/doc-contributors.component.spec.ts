import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocContributorsComponent } from './doc-contributors.component';

describe('DocContributorsComponent', () => {
  let component: DocContributorsComponent;
  let fixture: ComponentFixture<DocContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocContributorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
