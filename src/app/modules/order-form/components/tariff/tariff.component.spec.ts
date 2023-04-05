import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GetPriceService } from './../../services/get-price/get-price.service';
import { AppStateService } from './../../../../services/app-state/app-state.service';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComponent } from './tariff.component';
import { CodeIconsEnum } from 'src/app/enums/tariff-code-to-icons-enum';
import { TariffIconPipe } from '../../pipes/tariff-icon/tariff-icon.pipe';
import { ITariffGroup } from 'src/app/interfaces/tariff-group.interface';
import { ITariff } from 'src/app/interfaces/tariff.interface';

class MockAppStateService {
  setAppState(obj: Partial<IAppState>) {}
}

class MockGetPriceService {
  sendClickEvent() {}
}

@Pipe({ name: 'tariffIcon' })
class MockTarrifIconPipe implements PipeTransform {
  readonly codeIcons = CodeIconsEnum;
  transform(
    tariffClassId: number | undefined,
    tariffGroups: ITariffGroup[] = []
  ): string {
    return this.codeIcons.CAR;
  }
}

@Pipe({ name: 'tariffCodeToIconName' })
class MockTariffCodeToIconName implements PipeTransform {
  transform(code: string | null, codeIconsDict: {}): string {
    return 'code';
  }
}

describe('TariffComponent', () => {
  let component: TariffComponent;
  let fixture: ComponentFixture<TariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TariffComponent,
        MockTarrifIconPipe,
        MockTariffCodeToIconName,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppStateService, useClass: MockAppStateService },
        { provide: GetPriceService, useClass: MockGetPriceService },
      ],
      imports: [NoopAnimationsModule, MatMenuModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should #changeTarrif on button click', () => {
    //Arrange
    component.tariffGroups = [
      {
        code: 'code',
        name: 'name',
        tariffs: [{ classId: 1, name: 'string', minPriceString: 'string' }],
      },
    ];
    const changeTariffSpy = spyOn(component, 'changeTariff');
    const mainButton = fixture.nativeElement.querySelector('button');
    //Act
    mainButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tarrifGroupButton = document.querySelector(
      'button.tariff-group-button'
    );
    tarrifGroupButton!.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tarrifButton = document.querySelector('button.tariff-button');
    tarrifButton!.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(changeTariffSpy).toHaveBeenCalled();
  });
});
