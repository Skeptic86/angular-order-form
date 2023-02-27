import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-done-button',
  templateUrl: './done-button.component.html',
  styleUrls: ['./done-button.component.scss'],
})
export class DoneButtonComponent {
  @Output() buttonClickEvent = new EventEmitter();
  onButtonClick() {
    this.buttonClickEvent.emit();
  }
}
