import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationsAndBilling } from './cancellations-and-billing';

describe('CancellationsAndBilling', () => {
  let component: CancellationsAndBilling;
  let fixture: ComponentFixture<CancellationsAndBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationsAndBilling]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CancellationsAndBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
