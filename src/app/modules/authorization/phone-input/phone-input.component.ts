import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

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
export class PhoneInputComponent {
  @Input() phoneNumber: string = '';
  @Output() phoneNumberEvent = new EventEmitter<string>();

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp(/^9\d{9}$/)),
  ]);

  matcher = new MyErrorStateMatcher();
}
