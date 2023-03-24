import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeChooseFormComponent } from './code-choose-form.component';

describe('CodeChooseComponent', () => {
  let component: CodeChooseFormComponent;
  let fixture: ComponentFixture<CodeChooseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeChooseFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeChooseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit #toggleThirdFormEvent on #app-code-send-button click', () => {
    //Arrange
    const toggleThirdFormEventSpy = spyOn(
      component.toggleThirdFormEvent,
      'emit'
    );
    const codeSendButtonCallDe: DebugElement = fixture.debugElement.query(
      By.css('#call')
    );
    const codeSendButtonMessageDe: DebugElement = fixture.debugElement.query(
      By.css('#message')
    );
    //Act
    codeSendButtonCallDe.triggerEventHandler('showThirdFormEvent', 'call');
    codeSendButtonMessageDe.triggerEventHandler(
      'showThirdFormEvent',
      'message'
    );
    //Assert
    expect(toggleThirdFormEventSpy).toHaveBeenCalledTimes(2);
    expect(toggleThirdFormEventSpy).toHaveBeenCalledWith('call');
    expect(toggleThirdFormEventSpy).toHaveBeenCalledWith('message');
  });

  it('should emit #toggleFirstFormEvent on #app-change-number-button click', () => {
    //Arrange
    const toggleFirstFormEventSpy = spyOn(
      component.toggleFirstFormEvent,
      'emit'
    );
    const changeNumberButtonDe: DebugElement = fixture.debugElement.query(
      By.css('app-change-number-button')
    );
    //Act
    changeNumberButtonDe.triggerEventHandler('changeNumberEvent');
    //Assert
    expect(toggleFirstFormEventSpy).toHaveBeenCalled();
  });
});
