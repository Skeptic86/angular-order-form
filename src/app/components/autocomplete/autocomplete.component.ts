import { IAddress } from './../../interfaces/address.interface';
import { CompleteService } from '../../services/complete/complete.service';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounce, debounceTime, map, startWith} from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholderText?: string;
  myControl = new FormControl('');
  options: IAddress[] = []
  filteredOptions!: Observable<IAddress[]>;

  value = '';

  // getOptions(): void {
  //   this.options = this.completeService.getOptions()
  // }

  getOptions() {
    return this.completeService.getOptions()
    .subscribe((data) => {
      this.options = data as IAddress[]
    })
  }

  ngOnInit() {
    this.getOptions();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(2000),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): IAddress[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  constructor(private completeService: CompleteService) {}
}
