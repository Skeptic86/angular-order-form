import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ITariff } from './../../interfaces/tariff.interface';
import { IAppState } from './../../interfaces/app-state.interface';
import { AppStateService } from './../../services/app-state/app-state.service';
import { GetPriceService } from '../../services/get-price/get-price.service';
import { IDefaultInfo } from '../../interfaces/default-info.interface';
import { TariffService } from './../../services/tariff/tariff.service';
import { Component, OnInit } from '@angular/core';
import { IDefault } from 'src/app/interfaces/default.interface';
import { CodeIconsEnum } from '../../enums/tariff-code-to-icons-enum';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
  data = {} as IDefault;
  icon = '';

  readonly codeIcons = CodeIconsEnum;

  private getDefault(): Observable<IDefault> {
    return this.tariffService
      .getTariffGroupsInfo()
      .pipe(tap((value) => (this.data = value)));
  }

  private setAppStateTariff(tariffObj: ITariff) {
    this.appStateService.setAppState({ tariff: tariffObj });
  }

  private findNameById(id: number) {
    let temp: ITariff | undefined;
    let res: string | undefined;
    this.data.info.tariffGroups.forEach((elem) => {
      temp = elem.tariffs.find((tariff) => tariff.classId === id);
      if (temp) {
        res = temp.name;
      }
    });
    return res;
  }

  private findCodeById(id: number) {
    let temp: ITariff | undefined;
    let res: string | undefined;
    this.data.info.tariffGroups.forEach((elem) => {
      temp = elem.tariffs.find((tariff) => tariff.classId === id);
      if (temp) {
        res = elem.code;
      }
    });
    return res;
  }

  private ConvertStringToNumber(input: string | null) {
    if (!input || input.trim().length == 0) return NaN;
    return Number(input);
  }

  ngOnInit() {
    console.log('data', this.route.data);
    this.getDefault()
      .pipe
      // tap((_) => {
      //   const tariffIdURLParam =
      //     this.route.snapshot.queryParamMap.get('tariffId');
      //   const nmbr = this.ConvertStringToNumber(tariffIdURLParam);
      //   console.log('tariff str nmbr', tariffIdURLParam, nmbr);
      //   this.setTariffInit(nmbr);
      // })
      ()
      .subscribe((data: IDefault) => {
        this.data = data;
      });
  }

  private setTariffInit(tarrifIdUrl: number | null) {
    if (tarrifIdUrl) {
      const name = this.findNameById(tarrifIdUrl);
      const code = this.findCodeById(tarrifIdUrl);
      console.log('name: ', name);
      console.log('code', code);
      if (name && code) {
        this.changeTarrif(code, name, tarrifIdUrl);
      }
    } else {
      this.changeTarrif(
        this.data.info.tariffGroups[0].code,
        this.data.info.tariffGroups[0].tariffs[0].name,
        this.data.info.tariffGroups[0].tariffs[0].classId
      );
    }
  }

  changeTarrif(tariffCode: string, tariffName: string, tariffId: number) {
    const keyTypedTarrifCode = tariffCode as keyof typeof this.codeIcons;
    if (this.codeIcons[keyTypedTarrifCode] !== this.icon && this.icon !== '') {
      this.getPriceService.sendClickEvent();
    }
    this.icon = this.codeIcons[keyTypedTarrifCode];

    this.setAppStateTariff({ name: tariffName, classId: tariffId } as ITariff);
  }

  constructor(
    private tariffService: TariffService,
    private getPriceService: GetPriceService,
    private appStateService: AppStateService,
    private route: ActivatedRoute
  ) {}
}
