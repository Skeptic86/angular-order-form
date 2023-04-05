import { PaymentIconPipe } from './../../pipes/payment-icon/payment-icon.pipe';
import { AppStateService } from './../../../../services/app-state/app-state.service';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChooseComponent } from './option-choose.component';
import { MatMenuModule } from '@angular/material/menu';
import { PaymentTypeIconsEnum } from 'src/app/enums/payment-type-to-icons-enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAppStateService {
  setAppState() {}
}

@Pipe({ name: 'paymentIcon' })
class MockPaymentIconPipe implements PaymentIconPipe {
  readonly codeIcons = PaymentTypeIconsEnum;
  transform(paymentType: string | undefined): string {
    return paymentType || 'string';
  }
}

describe('OptionChooseComponent', () => {
  let component: OptionChooseComponent;
  let fixture: ComponentFixture<OptionChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionChooseComponent, MockPaymentIconPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
      imports: [MatMenuModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit #toggleShowCountriesEvent on #toggleShowCountries', () => {
    //Arrange
    const mainButton = fixture.nativeElement.querySelector('button');
    mainButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Act
    const buttonEl = document.querySelector('button.location-button');
    spyOn(component.toggleShowCountriesEvent, 'emit');
    buttonEl!.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(component.toggleShowCountriesEvent.emit).toHaveBeenCalledWith(true);
  });

  it('should call #setAppState with the correct payment method', () => {
    //Arrange
    const paymentMethod = { id: 1, name: 'Test', type: 'TestType' };
    //Act
    //@ts-ignore
    spyOn(component, 'setAppStatePayment');
    //@ts-ignore
    component.changePayment(paymentMethod);
    //Assert
    //@ts-ignore
    expect(component.setAppStatePayment).toHaveBeenCalledWith(paymentMethod);
  });
});
