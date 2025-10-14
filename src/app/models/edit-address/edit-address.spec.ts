import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddress } from './edit-address';

describe('EditAddress', () => {
  let component: EditAddress;
  let fixture: ComponentFixture<EditAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
