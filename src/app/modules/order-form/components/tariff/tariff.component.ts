import { ActivatedRoute } from '@angular/router';
import { ITariff } from 'src/app/interfaces/tariff.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { Component, Input, OnInit } from '@angular/core';
import { CodeIconsEnum } from 'src/app/enums/tariff-code-to-icons-enum';
import { ITariffGroup } from 'src/app/interfaces/tariff-group.interface';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
  @Input() tariff?: ITariff;
  @Input() tariffGroups?: ITariffGroup[];
  icon = '';

  readonly codeIcons = CodeIconsEnum;

  // private getDefault(): Observable<IDefault> {
  //   return this.tariffService
  //     .getTariffGroupsInfo()
  //     .pipe(tap((value) => (this.data = value)));
  // }

  private setAppStateTariff(tariffObj: ITariff): void {
    this.appStateService.setAppState({ tariff: tariffObj });
  }

  // private findNameById(id: number) {
  //   let temp: ITariff | undefined;
  //   let res: string | undefined;
  //   this.data.info.tariffGroups.forEach((elem) => {
  //     temp = elem.tariffs.find((tariff) => tariff.classId === id);
  //     if (temp) {
  //       res = temp.name;
  //     }
  //   });
  //   return res;
  // }

  // private findCodeById(id: number) {
  //   let temp: ITariff | undefined;
  //   let res: string | undefined;
  //   this.data.info.tariffGroups.forEach((elem) => {
  //     temp = elem.tariffs.find((tariff) => tariff.classId === id);
  //     if (temp) {
  //       res = elem.code;
  //     }
  //   });
  //   return res;
  // }

  ngOnInit(): void {}

  // private setTariffInit(tarrifIdUrl: number | null) {
  //   if (tarrifIdUrl) {
  //     const name = this.findNameById(tarrifIdUrl);
  //     const code = this.findCodeById(tarrifIdUrl);
  //     if (name && code) {
  //       this.changeTarrif(code, name, tarrifIdUrl);
  //     }
  //   } else {
  //     this.changeTarrif(
  //       this.data.info.tariffGroups[0].code,
  //       this.data.info.tariffGroups[0].tariffs[0].name,
  //       this.data.info.tariffGroups[0].tariffs[0].classId
  //     );
  //   }
  // }

  changeTarrif(tariff: ITariff): void {
    // const keyTypedTarrifCode = groupCode as keyof typeof this.codeIcons;
    // if (this.codeIcons[keyTypedTarrifCode] !== this.icon && this.icon !== '') {
    //   this.getPriceService.sendClickEvent();
    // }
    // this.icon = this.codeIcons[keyTypedTarrifCode];

    this.setAppStateTariff(tariff);
  }

  constructor(private appStateService: AppStateService) {}
}
