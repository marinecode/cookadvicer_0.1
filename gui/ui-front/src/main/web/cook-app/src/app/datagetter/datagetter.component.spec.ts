import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagetterComponent } from './datagetter.component';

describe('DatagetterComponent', () => {
  let component: DatagetterComponent;
  let fixture: ComponentFixture<DatagetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatagetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
