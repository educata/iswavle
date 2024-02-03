import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBreadcrumbsComponent } from './auto-breadcrumbs.component';

describe('AutoBreadcrumbsComponent', () => {
  let component: AutoBreadcrumbsComponent;
  let fixture: ComponentFixture<AutoBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoBreadcrumbsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
