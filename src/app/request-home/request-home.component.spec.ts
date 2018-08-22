import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHomeComponent } from './request-home.component';

describe('RequestHomeComponent', () => {
  let component: RequestHomeComponent;
  let fixture: ComponentFixture<RequestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
