import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneNumber?: string = '';
  @Input() isDisabled: boolean = false;
  @Output() phoneNumberEvent = new EventEmitter<string | null>();

  ngOnInit() {
    if (this.isDisabled) {
      this.phoneFormControl.disable();
    }
  }

  enableInput() {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.phoneFormControl.enable();
    }
  }

  clearPhoneNumber() {
    this.phoneNumber = '';
    this.numberChanged();
  }

  numberChanged() {
    if (!this.phoneFormControl.invalid) {
      this.phoneNumberEvent.emit(this.phoneNumber);
    }
  }

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp(/^9\d{9}$/)),
  ]);
}
