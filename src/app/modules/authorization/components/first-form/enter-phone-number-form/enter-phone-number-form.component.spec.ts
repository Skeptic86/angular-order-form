import { FormControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPhoneNumberComponent } from './enter-phone-number-form.component';

describe('EnterPhoneNumberComponent', () => {
  let component: EnterPhoneNumberComponent;
  let fixture: ComponentFixture<EnterPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterPhoneNumberComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.phoneFormControl = new FormControl();
    fixture.detectChanges();
  });

  it('it should emit #showFirstFormEvent on button click and on enter press, if #phoneInput >=10', () => {
    //Arrange
    const showFirstFormEventSpy = spyOn(component.showFirstFormEvent, 'emit');
    component.phoneInput = '9224234432';
    const authButtonEl: HTMLElement = fixture.nativeElement.querySelector(
      'app-authorization-button'
    );
    fixture.detectChanges();
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    //Act
    authButtonEl.dispatchEvent(new Event('confirmPhoneNumberEvent'));
    // phoneInput.dispatchEvent(new Event('keyup.enter'));
    component.onEnter(1);
    fixture.detectChanges();
    //Assert
    expect(showFirstFormEventSpy).toHaveBeenCalledTimes(2);
  });

  it('it should not emit #showFirstFormEvent on button click and on enter press, if #phoneInput < 10', () => {
    //Arrange
    const showFirstFormEventSpy = spyOn(component.showFirstFormEvent, 'emit');
    component.phoneInput = '922';
    const authButtonEl: HTMLElement = fixture.nativeElement.querySelector(
      'app-authorization-button'
    );
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    //Act
    authButtonEl.dispatchEvent(new Event('confirmPhoneNumberEvent'));
    component.onEnter(1);
    fixture.detectChanges();
    //Assert
    expect(showFirstFormEventSpy).not.toHaveBeenCalled();
  });

  it('shoud get #phoneInput if formControl isValid', () => {
    //Arrange
    const expectedValue = '9224234432';
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    component.phoneFormControl.setValue(expectedValue);
    //Act
    phoneInput.dispatchEvent(new Event('phoneNumberEvent'));
    //Assert
    expect(component.getPhoneInput()).toBe(expectedValue);
  });

  it("shoud get #phoneInput = '' if formControl isNotValid", () => {
    //Arrange
    const expectedValue = '';
    const phoneInput: HTMLElement =
      fixture.nativeElement.querySelector('app-phone-input');
    component.phoneFormControl.setValue(expectedValue);
    //Act
    phoneInput.dispatchEvent(new Event('phoneNumberEvent'));
    //Assert
    expect(component.getPhoneInput()).toBe(expectedValue);
  });
});
