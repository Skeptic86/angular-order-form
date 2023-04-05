import { GetPriceService } from './../../services/get-price/get-price.service';
import { OrderButtonService } from '../../services/order-button/order-button.service';
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

  private setAppStateTariff(tariffObj: ITariff): void {
    this.appStateService.setAppState({ tariff: tariffObj });
  }

  ngOnInit(): void {}

  changeTariff(tariff: ITariff): void {
    this.setAppStateTariff(tariff);
    this.getPriceService.sendClickEvent();
  }

  constructor(
    private appStateService: AppStateService,
    private getPriceService: GetPriceService
  ) {}
}
