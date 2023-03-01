import { IAddress } from './../../../../interfaces/address.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
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

  selectedBaseEmit(): void {
    this.selectedBaseEvent.emit(this.selectedBaseId);
    this.appStateService.setAppState({
      addressFrom: {
        street: null,
        title: '',
        house: null,
        subtitle: null,
        latitude: 57.15114882108171,
        longitude: 65.53553704887027,
        comment: '',
      },
    });
    this.appStateService.setAppState({
      addressTo: {
        street: null,
        title: '',
        house: null,
        subtitle: null,
        latitude: 57.15114882108171,
        longitude: 65.53553704887027,
        comment: '',
      },
    });
  }

  ngOnInit(): void {
    this.selectedBaseEvent.emit(this.selectedBaseId);
  }

  constructor(private appStateService: AppStateService) {}
}
