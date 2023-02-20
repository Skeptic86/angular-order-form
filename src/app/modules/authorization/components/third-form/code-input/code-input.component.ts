import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
})
export class CodeInputComponent {
  @Output() confirmCodeEvent = new EventEmitter<string>();

  codeChanged() {
    console.log('codeChanged', this.codeFormControl.value);
    if (this.codeFormControl.value?.length === 4) {
      console.log('value emmited');
      this.confirmCodeEvent.emit(this.codeFormControl.value);
    }
  }

  codeFormControl = new FormControl('');
}
