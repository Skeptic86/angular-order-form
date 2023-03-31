import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneButtonComponent } from './done-button.component';

describe('DoneButtonComponent', () => {
  let component: DoneButtonComponent;
  let fixture: ComponentFixture<DoneButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoneButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoneButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit #buttonClickEvent on #buttonClick', () => {
    //Arrange
    const buttonClickEventSpy = spyOn(component.buttonClickEvent, 'emit');
    const buttonEl = fixture.nativeElement.querySelector('button');
    //Act
    buttonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(buttonClickEventSpy).toHaveBeenCalled();
  });
});
