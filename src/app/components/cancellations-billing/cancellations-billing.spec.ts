import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationsBilling } from './cancellations-billing';

describe('CancellationsBilling', () => {
  let component: CancellationsBilling;
  let fixture: ComponentFixture<CancellationsBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationsBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationsBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
