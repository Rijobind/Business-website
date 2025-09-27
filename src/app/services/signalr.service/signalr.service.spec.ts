import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrService } from './signalr.service';

describe('SignalrService', () => {
  let component: SignalrService;
  let fixture: ComponentFixture<SignalrService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalrService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
