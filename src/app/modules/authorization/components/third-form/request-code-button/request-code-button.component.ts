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
  @ViewChild('timer') timer?: ElementRef;
  @Output() requestCodeAgainEvent = new EventEmitter();
  isDisabled = true;

  timeEnd(): void {
    this.isDisabled = false;
  }

  requestCodeAgain(): void {
    this.isDisabled = true;
    this.timer?.nativeElement.reset();
    this.timer?.nativeElement.start();
    this.requestCodeAgainEvent.emit();
  }

  ngOnInit(): void {}
}
