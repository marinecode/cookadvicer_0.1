import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsFieldComponent } from './ingredients-field.component';

describe('IngredientsFieldComponent', () => {
  let component: IngredientsFieldComponent;
  let fixture: ComponentFixture<IngredientsFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
