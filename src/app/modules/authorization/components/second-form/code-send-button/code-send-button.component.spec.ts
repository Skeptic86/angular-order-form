import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSendButtonComponent } from './code-send-button.component';

describe('CodeSendButtonComponent', () => {
  let component: CodeSendButtonComponent;
  let fixture: ComponentFixture<CodeSendButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeSendButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeSendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit #showThirdFormEvent on button click', () => {
    //Arrange
    const showThirdFormEventSpy = spyOn(component.showThirdFormEvent, 'emit');
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    const icon = 'call';
    component.icon = icon;
    component.buttonText = 'Позвоните мне';
    //Act
    button.dispatchEvent(new Event('click'));
    //Assert
    expect(showThirdFormEventSpy).toHaveBeenCalledWith(icon);
  });
});
