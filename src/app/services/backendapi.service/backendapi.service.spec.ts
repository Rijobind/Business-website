import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendapiService } from './backendapi.service';

describe('BackendapiService', () => {
  let component: BackendapiService;
  let fixture: ComponentFixture<BackendapiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendapiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendapiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
