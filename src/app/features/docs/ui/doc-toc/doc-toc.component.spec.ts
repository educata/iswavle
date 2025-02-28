import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTocComponent } from './doc-toc.component';

describe('DocTocComponent', () => {
  let component: DocTocComponent;
  let fixture: ComponentFixture<DocTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocTocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
