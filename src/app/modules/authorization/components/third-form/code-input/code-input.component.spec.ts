import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInputComponent } from './code-input.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('CodeInputComponent', () => {
  let component: CodeInputComponent;
  let fixture: ComponentFixture<CodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit #confirmCodeEvent if #code.length===4', () => {
    //Arrange
    const expectedValue = '1111';
    const confirmCodeEventSpy = spyOn(component.confirmCodeEvent, 'emit');
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Act
    inputEl.value = expectedValue;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //Assert
    expect(confirmCodeEventSpy).toHaveBeenCalledWith(expectedValue);
  });

  it('should not emit #confirmCodeEvent if #code.length < 4', () => {
    //Arrange
    const confirmCodeEventSpy = spyOn(component.confirmCodeEvent, 'emit');
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Act
    inputEl.value = '111';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //Assert
    expect(confirmCodeEventSpy).not.toHaveBeenCalled();
  });

  it('shoud clear input on button click', () => {
    //Arrange
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    //Act
    inputEl.value = '111';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const buttonEl: HTMLElement = fixture.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('onclick'));
    fixture.detectChanges();
    //Assert
    expect(inputEl.value).toBe('');
  });
});
