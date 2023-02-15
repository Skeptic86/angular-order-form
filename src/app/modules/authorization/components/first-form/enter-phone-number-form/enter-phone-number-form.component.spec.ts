import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPhoneNumberComponent } from './enter-phone-number-form.component';

describe('EnterPhoneNumberComponent', () => {
  let component: EnterPhoneNumberComponent;
  let fixture: ComponentFixture<EnterPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterPhoneNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});