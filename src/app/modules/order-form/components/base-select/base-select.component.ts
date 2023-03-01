import { IBase } from './../../../../interfaces/base.interface';
import { BaseService } from './../../services/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss'],
})
export class BaseSelectComponent implements OnInit {
  @Output() selectedBaseEvent = new EventEmitter<number>();
  @Input() bases?: IBase[];
  @Input() selectedBaseId?: number;

  selectedBaseEmit() {
    this.selectedBaseEvent.emit(this.selectedBaseId);
  }

  ngOnInit(): void {
    this.selectedBaseEmit();
  }

  constructor() {}
}
