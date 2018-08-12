import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmoduleComponent } from './loginmodule.component';

describe('LoginmoduleComponent', () => {
  let component: LoginmoduleComponent;
  let fixture: ComponentFixture<LoginmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
