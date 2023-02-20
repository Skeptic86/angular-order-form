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

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(
//       control &&
//       control.invalid &&
//       (control.dirty || control.touched || isSubmitted)
//     );
//   }
// }

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneNumber? = '';
  @Input() isDisabled = false;
  @Output() phoneNumberEvent = new EventEmitter<string | null>();
  phoneFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(new RegExp(/^9\d+/)),
  ]);
  // matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.phoneFormControl.setValue(this.phoneNumber ?? '');
    if (this.isDisabled) {
      this.phoneFormControl.disable();
    }
  }

  enableInput(): void {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.phoneFormControl.enable();
    }
  }

  clearPhoneNumber(): void {
    this.phoneFormControl.setValue('');
    this.numberChanged();
  }

  numberChanged(): void {
    if (this.phoneFormControl.valid) {
      console.log(this.phoneFormControl.value);
      this.phoneNumberEvent.emit(this.phoneFormControl.value);
    }
  }
}
