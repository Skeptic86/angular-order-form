import { FormControl, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-code-form',
  templateUrl: './confirm-code-form.component.html',
  styleUrls: ['./confirm-code-form.component.scss'],
})
export class ConfirmCodeFormComponent {
  @Input() phoneNumber?: string;
  @Output() sendPhoneNumberEvent = new EventEmitter<string>();
  @Output() sendRequestCodeEvent = new EventEmitter();
  @Output() confirmCodeEvent = new EventEmitter<string>();
  iconToggle = true;

  sendRequestCode(): void {
    this.sendRequestCodeEvent.emit();
  }

  phoneFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(new RegExp(/^9\d+/)),
  ]);

  confirmCode(code: string): void {
    this.confirmCodeEvent.emit(code);
  }

  sendPhoneNumber(): void {
    if (this.phoneFormControl.valid && this.phoneFormControl.value) {
      this.sendPhoneNumberEvent.emit(this.phoneFormControl.value);
    }
  }

  // enableInput(event: any) {
  //   console.log(event);
  //   event.target.disable = false;
  //   event.target.isDisabled = false;
  //   this.iconToggle = false;
  // }
}
