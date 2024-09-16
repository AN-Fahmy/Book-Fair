import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcollectionsComponent } from './allcollections.component';

describe('AllcollectionsComponent', () => {
  let component: AllcollectionsComponent;
  let fixture: ComponentFixture<AllcollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcollectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
