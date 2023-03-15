import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInputAddressComponent } from './autocomplete-input-address.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteInputAddressComponent;
  let fixture: ComponentFixture<AutocompleteInputAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AutocompleteInputAddressComponent,
        HttpClient,
        FormControl,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteInputAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
