import { GetAddressesService } from './../../../order-form/services/get-addresses/get-addresses.service';
import { IAddress } from './../../../../interfaces/address.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDialogComponent } from './map-dialog.component';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import maplibreGl from 'maplibre-gl';

class MockAppStateService {
  getStateValue(): IAppState {
    return {
      baseId: 1,
      addressFrom: {
        title: 'address 1',
        longitude: 65.53553704887027,
        latitude: 57.15114882108171,
        comment: 'comment',
        street: null,
        subtitle: null,
        house: null,
      },
    };
  }
}

class MockMatDialogRef {}

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

describe('MapDialogComponent', () => {
  let component: MapDialogComponent;
  let fixture: ComponentFixture<MapDialogComponent>;
  let mockAddresses: Observable<IAddress[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapDialogComponent],
      imports: [MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppStateService, useClass: MockAppStateService },
        { provide: GetAddressesService, useClass: MockGetAddressesService },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapDialogComponent);
    component = fixture.componentInstance;
    mockAddresses = of([
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
    fixture.detectChanges();
  });

  // it('should setAppState on #DoneButton click', () => {
  //   //Arrange
  //   const doneButtonEl: HTMLElement =
  //     fixture.nativeElement.querySelector('.done-button');
  //   const onClickDoneButtonSpy = spyOn(component, 'onClickDoneButton');
  //   const getAddressesSpy = spyOn(component, 'getAddresses');
  //   //Act
  //   doneButtonEl.dispatchEvent(new Event('click'));
  //   fixture.detectChanges();
  //   //Assert
  //   expect(onClickDoneButtonSpy).toHaveBeenCalled();
  // });

  it('should get address from state on #ngInit', () => {
    //Arrange
    const expectedAddress = {
      title: 'address 1',
      longitude: 65.53553704887027,
      latitude: 57.15114882108171,
      comment: 'comment',
      street: null,
      subtitle: null,
      house: null,
    };
    //Assert
    expect(component.address).toEqual(expectedAddress);
  });
});
