import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInputComponent } from './phone-input.component';

fdescribe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneInputComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;
    
    const phoneFormControl = new FormControl();
    component.phoneFormControl = phoneFormControl

    fixture.detectChanges();
  });

  it('component shoud be disabled if #isDisabled true', () => {
    const isDisabled = true;
    component.isDisabled = isDisabled;
    fixture.detectChanges()
    expect(component.isDisabled).toBeTrue();
  });

  it('component shoud be not disabled if #isDisabled false', () => {
    const isDisabled = false;
    component.isDisabled = isDisabled;
    fixture.detectChanges()
    expect(component.isDisabled).toBeFalse();
  });

  it('#phoneFormControl should be \'\' on #close-button (mousedown)', () => {
    const closeButton: DebugElement = fixture.debugElement.query(By.css('.close-button'));
    console.log(closeButton)  
    fixture.detectChanges()
  });

});
