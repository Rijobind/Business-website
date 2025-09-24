import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordVerifySuccess } from './forgot-password-verify-success';

describe('ForgotPasswordVerifySuccess', () => {
  let component: ForgotPasswordVerifySuccess;
  let fixture: ComponentFixture<ForgotPasswordVerifySuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordVerifySuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordVerifySuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
