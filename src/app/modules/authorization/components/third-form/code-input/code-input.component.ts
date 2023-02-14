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
  @Input() code?: string = '';

  codeFormControl = new FormControl('');
}
