import { FormControl, Validators } from '@angular/forms';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-enter-phone-number-form',
  templateUrl: './enter-phone-number-form.component.html',
  styleUrls: ['./enter-phone-number-form.component.scss'],
})
export class EnterPhoneNumberComponent {
  @Output() showFirstFormEvent = new EventEmitter<string>();
  @Input() phoneInput? = '';
  phoneFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(new RegExp(/^9\d+/)),
  ]);

  private sendFisrtFormFlag(phoneNumber: string): void {
    this.showFirstFormEvent.emit(phoneNumber);
  }

  onEnter($event: any) {
    this.confirmPhoneInput();
  }

  getPhoneInput(): string {
    if (this.phoneFormControl.valid && this.phoneFormControl.value) {
      this.phoneInput = this.phoneFormControl.value;
    } else {
      this.phoneInput = '';
    }
    return this.phoneInput;
  }

  confirmPhoneInput(): void {
    if (this.phoneInput?.length! >= 10) {
      this.sendFisrtFormFlag(this.phoneInput!);
    }
  }
}
