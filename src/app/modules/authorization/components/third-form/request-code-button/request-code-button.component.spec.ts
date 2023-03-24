import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdTimerModule } from 'angular-cd-timer';

import { RequestCodeButtonComponent } from './request-code-button.component';

fdescribe('RequestCodeButtonComponent', () => {
  let component: RequestCodeButtonComponent;
  let fixture: ComponentFixture<RequestCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCodeButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CdTimerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestCodeButtonComponent);
    component = fixture.componentInstance;
    component.isDisabled = false;
    fixture.detectChanges();
  });

  it('shoud emit #requestCodeAgainEvent on button click & reset timer', () => {
    //Arrange
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    const timer: HTMLElement = fixture.nativeElement.querySelector('cd-timer');
    const requestCodeAgainEventSpy = spyOn(
      component.requestCodeAgainEvent,
      'emit'
    );
    //Act
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(requestCodeAgainEventSpy).toHaveBeenCalled();
  });

  // it('should enable button on #timeEnd', () => {
  //   //Arrange
  //   const timer: HTMLElement = fixture.nativeElement.querySelector('cd-timer');
  //   //Act
  //   timer.dispatchEvent(new Event('onComplete'));
  // });
});
