import { IAddress } from '../../interfaces/address.interface';
import { CompleteService } from '../../services/complete/complete.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Input } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-autocomplete-input-address',
  templateUrl: './autocomplete-input-address.component.html',
  styleUrls: ['./autocomplete-input-address.component.scss'],
})
export class AutocompleteInputAddressComponent implements OnInit {
  @Input() placeholderText?: string;
  autocompleteInput = new FormControl('');
  private options: IAddress[] = [];
  filteredOptions!: Observable<IAddress[]>;

  value = '';

  private getOptions() {
    return this.completeService.getOptions().subscribe((data) => {
      this.options = data as IAddress[];
    });
  }

  ngOnInit() {
    this.getOptions();
    this.filteredOptions = this.autocompleteInput.valueChanges.pipe(
      debounceTime(2000),
      tap(value => this.appStateService.sendClickEvent()),
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): IAddress[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  constructor(private completeService: CompleteService, private appStateService: AppStateService) {}
}
