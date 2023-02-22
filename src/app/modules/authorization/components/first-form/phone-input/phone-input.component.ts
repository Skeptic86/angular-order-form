import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { TitleStrategy } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneNumber? = '';
  @Input() isDisabled = false;
  @Input() phoneFormControl?: FormControl;
  @Output() phoneNumberEvent = new EventEmitter();

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.phoneFormControl!.setValue(this.phoneNumber ?? '');
    if (this.isDisabled) {
      this.phoneFormControl!.disable();
    }
  }

  enableInput(): void {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.phoneFormControl!.enable();
    }
  }

  clearPhoneNumber(): void {
    this.phoneFormControl!.setValue('');
  }

  numberChanged(): void {
    this.phoneNumberEvent.emit();
  }
}
