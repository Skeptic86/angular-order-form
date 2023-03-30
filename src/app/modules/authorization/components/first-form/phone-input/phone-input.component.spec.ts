import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInputComponent } from './phone-input.component';

describe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneInputComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;

    const phoneFormControl = new FormControl();
    component.phoneFormControl = phoneFormControl;

    fixture.detectChanges();
  });

  it('component shoud be disabled if #isDisabled true, enable-button exist', () => {
    //Arrange
    const isDisabled = true;
    component.isDisabled = isDisabled;
    fixture.detectChanges();
    const enableButtonEl: HTMLElement =
      fixture.nativeElement.querySelector('.enable-button');
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Act
    inputEl.value = '123';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    //Assert
    expect(component.isDisabled).toBeTrue();
    expect(enableButtonEl).toBeTruthy();
  });

  it('component shoud be not disabled if #isDisabled false, enable-button does not exist', () => {
    //Arrange
    const isDisabled = false;
    component.isDisabled = isDisabled;
    fixture.detectChanges();
    const expectedValue = '123';
    //Act
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputEl.value = expectedValue;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const enableButtonEl: HTMLElement =
      fixture.nativeElement.querySelector('.enable-button');
    //Assert
    expect(inputEl.value).toBe(expectedValue);
    expect(enableButtonEl).toBeFalsy();
  });

  it("#phoneFormControl should be '' on #close-button (mousedown)", () => {
    //Arrange
    const isDisabled = false;
    component.isDisabled = isDisabled;
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Act
    component.phoneFormControl?.setValue('9224234432');
    inputEl.value = '9224234432';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const closeButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('.close-button');
    closeButton.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    //Assert
    expect(component.phoneFormControl?.value).toBe('');
  });

  it('#phoneNumberEvent should emit value on input change', () => {
    const phoneNumberEventSpy = spyOn(component.phoneNumberEvent, 'emit');
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input')!;
    input.value = '9224234432';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(phoneNumberEventSpy).toHaveBeenCalled();
  });
});
