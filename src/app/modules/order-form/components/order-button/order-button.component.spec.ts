import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { AppStateService } from './../../../../services/app-state/app-state.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderButtonComponent } from './order-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

class MockAppStateService {
  getStateValue(): IAppState {
    return {
      addressFrom: {
        title: '1',
        street: null,
        house: null,
        subtitle: null,
        latitude: 1,
        longitude: 1,
        comment: 'string',
      },
      addressTo: {
        title: '2',
        street: null,
        house: null,
        subtitle: null,
        latitude: 1,
        longitude: 1,
        comment: 'string',
      },
    };
  }
}

class MockDialog {
  open(componentStub: any) {
    return true;
  }
}

class MockMatSnackBar {
  openFromComponent(stubComponent: any, object: any) {
    return true;
  }
}

describe('OrderButtonComponent', () => {
  let component: OrderButtonComponent;
  let fixture: ComponentFixture<OrderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppStateService, useClass: MockAppStateService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: MatDialog, useClass: MockDialog },
      ],
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should #openDialog on button click if appState.getStateValue().addressFrom === true', () => {
    //Arrange
    const buttonEl = fixture.nativeElement.querySelector('button');
    //@ts-ignore
    const openDialogSpy = spyOn(component, 'openDialog');
    //Act
    buttonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should not #openDialog on button click if appState.getStateValue().addressFrom === false', () => {
    //Arrange
    const getStateValueSpy = spyOn(
      //@ts-ignore
      component.appStateService,
      'getStateValue'
    ).and.returnValue({
      addressFrom: {
        title: null,
        street: null,
        house: null,
        subtitle: null,
        latitude: 1,
        longitude: 1,
        comment: 'string',
      },
      addressTo: {
        title: null,
        street: null,
        house: null,
        subtitle: null,
        latitude: 1,
        longitude: 1,
        comment: 'string',
      },
    });
    const buttonEl = fixture.nativeElement.querySelector('button');
    //@ts-ignore
    const snackBarSpy = spyOn(component.errorSnackBar, 'openFromComponent');
    //Act
    buttonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(snackBarSpy).toHaveBeenCalled();
  });
});
