import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

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
  @Input() phoneNumber?: string = '';
  @Input() isDisabled: boolean = false;
  @Output() phoneNumberEvent = new EventEmitter<string | null>();
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp(/^9\d+/)),
  ]);
  // matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
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
    this.phoneNumber = '';
    this.numberChanged();
  }

  numberChanged(): void {
    console.log(this.phoneFormControl.value);
    if (this.phoneFormControl.valid) {
      this.phoneNumberEvent.emit(this.phoneNumber);
    }
  }
}
