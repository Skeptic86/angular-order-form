import { IBase } from './../../../../interfaces/base.interface';
import { BaseService } from './../../services/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss'],
})
export class BaseSelectComponent {
  @Input() bases?: IBase[];
  selectedBase? = 0;

  constructor() {}
}
