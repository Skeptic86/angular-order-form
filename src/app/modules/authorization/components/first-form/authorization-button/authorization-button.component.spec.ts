import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationButtonComponent } from './authorization-button.component';

describe('AuthorizationButtonComponent', () => {
  let component: AuthorizationButtonComponent;
  let fixture: ComponentFixture<AuthorizationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit value on click', () => {
    //Arrange
    const confirmPhoneNumberEventSpy = spyOn(
      component.confirmPhoneNumberEvent,
      'emit'
    );
    const buttonEl: HTMLElement = fixture.nativeElement.querySelector('button');
    //Act
    buttonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(confirmPhoneNumberEventSpy).toHaveBeenCalled();
  });
});
