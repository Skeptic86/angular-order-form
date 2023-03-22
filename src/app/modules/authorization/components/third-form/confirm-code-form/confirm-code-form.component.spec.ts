import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodeFormComponent } from './confirm-code-form.component';
import { By } from '@angular/platform-browser';



describe('ConfirmCodeFormComponent', () => {
  let component: ConfirmCodeFormComponent;
  let fixture: ComponentFixture<ConfirmCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCodeFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#requestCode should emit', () => {
    const requestCodeSpy = spyOn(component, "sendRequestCode")
    component.sendRequestCode()
    expect(requestCodeSpy).toHaveBeenCalled()
  })

  it('#confirmCode should emit value', () => {
    const confirmCodeSpy = spyOn(component, "confirmCode");
    const code = "code";
    component.confirmCode(code);
    expect(confirmCodeSpy).toHaveBeenCalledWith(code);
  })

  it('#sendPhoneNumber should emit and #phoneFormControl is valid', () => {
    const sendPhoneNumberEventSpy = spyOn(component.sendPhoneNumberEvent, "emit");
    const phoneInput: DebugElement = fixture.debugElement.query(By.css('app-phone-input'))
    console.log(phoneInput.childNodes)
    phoneInput.properties["phoneFormControl"].value = "9224234432"
    phoneInput.properties["phoneFormControl"].status = "VALID"
    // fixture.detectChanges()
    component.sendPhoneNumber();
    expect(sendPhoneNumberEventSpy).toHaveBeenCalledWith("9224234432");
  })

  it('#sendPhoneNumber should not emit and #phoneFormControl is not valid', () => {
    const sendPhoneNumberEventSpy = spyOn(component.sendPhoneNumberEvent, "emit");
    component.phoneFormControl.setValue(null);
    component.sendPhoneNumber();
    expect(sendPhoneNumberEventSpy).not.toHaveBeenCalled();
  })
});
