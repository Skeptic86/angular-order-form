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
  @ViewChild('input') input?: ElementRef;
  @Output() showFirstFormEvent = new EventEmitter<string>();
  @Input() phoneInput? = '';

  private sendFisrtFormFlag(phoneNumber: string): void {
    this.showFirstFormEvent.emit(phoneNumber);
  }

  onEnter($event: any) {
    console.log($event);
    this.confirmPhoneInput();
  }

  getPhoneInput(input: string | null): string {
    if (input) {
      this.phoneInput = input;
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
