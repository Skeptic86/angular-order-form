import { IBase } from './../../../../interfaces/base.interface';
import { BaseService } from './../../services/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss'],
})
export class BaseSelectComponent {
  @Output() selectedBaseEvent = new EventEmitter<IBase>();
  @Input() bases?: IBase[];
  selectedBase?: IBase;

  selectedBaseEmit() {
    this.selectedBaseEvent.emit(this.selectedBase);
  }

  constructor() {}
}
