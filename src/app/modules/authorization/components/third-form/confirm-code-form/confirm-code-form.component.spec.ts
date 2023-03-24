import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodeFormComponent } from './confirm-code-form.component';
import { By } from '@angular/platform-browser';

describe('ConfirmCodeFormComponent', () => {
  let component: ConfirmCodeFormComponent;
  let fixture: ComponentFixture<ConfirmCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCodeFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#requestCode should emit', () => {
    //Arrange
    const requestCodeSpy = spyOn(component, 'sendRequestCode');
    //Act
    const requestCodeButton = fixture.nativeElement.querySelector(
      'app-request-code-button'
    );
    requestCodeButton.dispatchEvent(new Event('requestCodeAgainEvent'));
    //Assert
    expect(requestCodeSpy).toHaveBeenCalled();
  });

  it('#confirmCode should emit value', () => {
    //Arrange
    const confirmCodeSpy = spyOn(component, 'confirmCode');
    const expectedCode = 'code';
    //Act
    const codeInputDe = fixture.debugElement.query(By.css('app-code-input'));
    codeInputDe.triggerEventHandler('confirmCodeEvent', expectedCode);
    //Assert
    expect(confirmCodeSpy).toHaveBeenCalledWith(expectedCode);
  });

  it('#sendPhoneNumber should emit and #phoneFormControl is valid', () => {
    //Arrange
    const expectedPhoneNumber = '92242344432';
    const sendPhoneNumberEventSpy = spyOn(
      component.sendPhoneNumberEvent,
      'emit'
    );
    //Act
    component.phoneFormControl.setValue(expectedPhoneNumber);
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    phoneInput.dispatchEvent(new Event('phoneNumberEvent'));
    // Assert
    expect(sendPhoneNumberEventSpy).toHaveBeenCalledWith(expectedPhoneNumber);
  });

  it('#sendPhoneNumber should not emit and #phoneFormControl is not valid', () => {
    //Arrange
    const sendPhoneNumberEventSpy = spyOn(
      component.sendPhoneNumberEvent,
      'emit'
    );
    //Act
    component.phoneFormControl.setValue(null);
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    phoneInput.dispatchEvent(new Event('phoneNumberEvent'));
    //Assert
    expect(sendPhoneNumberEventSpy).not.toHaveBeenCalled();
  });
});
