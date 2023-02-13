import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-number-button',
  templateUrl: './change-number-button.component.html',
  styleUrls: ['./change-number-button.component.scss'],
})
export class ChangeNumberButtonComponent {
  @Output() changeNumberEvent = new EventEmitter();

  changeNumber() {
    this.changeNumberEvent.emit();
  }
}
