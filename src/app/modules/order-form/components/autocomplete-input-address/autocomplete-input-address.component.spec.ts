import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IAddress } from './../../../../interfaces/address.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInputAddressComponent } from './autocomplete-input-address.component';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { GetAddressesService } from '../../services/get-addresses/get-addresses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { GetPriceService } from '../../services/get-price/get-price.service';

class MockGetPriceService {
  sendClickEvent() {}
}

class MockGetAddressesService {
  private readonly apiURL = 'https://dev-api.taxsee.com/client/v1/addresses';

  getAddresses(): Observable<IAddress[]> {
    return of([
      {
        title: 'Машиностроителей проспект',
        subtitle: '',
        street: {
          id: 100416,
          name: 'Машиностроителей проспект',
        },
        house: null,
        latitude: 55.445465,
        longitude: 65.34778,
        comment: 'comment',
      },
    ]);
  }

  getAddressesApi(queryTitle?: string | null): Observable<Object | IAddress[]> {
    return of([
      {
        title: 'Машиностроителей проспект',
        subtitle: '',
        street: {
          id: 100416,
          name: 'Машиностроителей проспект',
        },
        house: null,
        latitude: 55.445465,
        longitude: 65.34778,
        comment: 'comment',
      },
    ]);
  }
}

fdescribe('AutocompleteComponent', () => {
  let component: AutocompleteInputAddressComponent;
  let fixture: ComponentFixture<AutocompleteInputAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteInputAddressComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: GetAddressesService, useClass: MockGetAddressesService },
        { provide: GetPriceService, useClass: MockGetPriceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteInputAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#sendAddressEvent should emit address', () => {
    //Arrange
    const expectedAddress: IAddress = {
      title: 'Машиностроителей проспект',
      subtitle: '',
      street: {
        id: 100416,
        name: 'Машиностроителей проспект',
      },
      house: null,
      latitude: 55.445465,
      longitude: 65.34778,
      comment: 'comment',
    };
    const sendAddressEventSpy = spyOn(component.sendAddressEvent, 'emit');
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    //Act
    inputEl.dispatchEvent(new Event('focusin'));
    inputEl.value = 'кура';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const optionEl = document.querySelector('mat-option');
    optionEl!.dispatchEvent(new Event('onSelectionChange'));
    fixture.detectChanges();
    console.log(optionEl);
    //Assert
    expect(sendAddressEventSpy).toHaveBeenCalledWith(expectedAddress);
  });
});
