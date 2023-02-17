import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { timer } from 'rxjs';

@Component({
  selector: 'app-request-code-button',
  templateUrl: './request-code-button.component.html',
  styleUrls: ['./request-code-button.component.scss'],
})
export class RequestCodeButtonComponent implements OnInit {
  @ViewChild('timer') timer!: CdTimerComponent;
  @Output() requestCodeAgainEvent = new EventEmitter();
  isDisabled = true;

  timeEnd(): void {
    this.isDisabled = false;
  }

  requestCodeAgain(): void {
    this.isDisabled = true;
    this.timer.reset();
    this.timer.start();
    this.requestCodeAgainEvent.emit();
  }

  ngOnInit(): void {}
}
