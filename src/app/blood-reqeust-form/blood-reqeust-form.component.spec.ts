import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodReqeustFormComponent } from './blood-reqeust-form.component';

describe('BloodReqeustFormComponent', () => {
  let component: BloodReqeustFormComponent;
  let fixture: ComponentFixture<BloodReqeustFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodReqeustFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodReqeustFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
