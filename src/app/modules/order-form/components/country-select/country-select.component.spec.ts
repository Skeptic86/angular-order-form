import { CountryService } from './../../services/country/country.service';
import { IPhoneFormat } from './../../../../interfaces/phone-format.interface';
import { Observable, of } from 'rxjs';
import { ICountry } from './../../../../interfaces/country.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectComponent } from './country-select.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockCountryService {
  getCountriesApi(): Observable<ICountry[]> {
    return of([
      {
        name: 'Россия',
        code: 'ru',
        phoneFormats: [
          {
            code: 'string',
            prefix: 'string',
            type: 'string',
            masks: ['string'],
          },
        ],
      },
    ]);
  }
}

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: CountryService, useClass: MockCountryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit #selectedCountryEvent on #ngOnInit', () => {
    //Arrange
    const selectedCountryEventSpy = spyOn(
      component.selectedCountryEvent,
      'emit'
    );
    //Act
    component.ngOnInit();
    fixture.detectChanges();
    //Assert
    expect(selectedCountryEventSpy).toHaveBeenCalled();
  });

  it('should emit #selectedCountryEvent on #selectionChange', () => {
    //Arrange
    const selectedCountryEventSpy = spyOn(
      component.selectedCountryEvent,
      'emit'
    );
    const matSelectEl = fixture.nativeElement.querySelector('mat-select');
    //Act
    matSelectEl.dispatchEvent(new Event('selectionChange'));
    fixture.detectChanges();
    //Assert
    expect(selectedCountryEventSpy).toHaveBeenCalled();
  });
});
