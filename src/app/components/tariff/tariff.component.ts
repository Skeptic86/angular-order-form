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

  // getTariffGroups() {
  //   return this.tariffService.getTariffGroups()
  // }

  private getDefault() {
    return this.tariffService.getTariffGroups().subscribe((data: IDefault) => {
      this.data = data;
      this.changeIcon(this.data.info.tariffGroups[0].code);
    });
  }

  ngOnInit() {
    this.getDefault();
  }

  changeIcon(iconName: string) {
    const keyTyped = iconName as keyof typeof this.codeIcons;
    if (this.codeIcons[keyTyped] !== this.icon && this.icon !== '') {
      this.getPriceService.sendClickEvent();
    }
    this.icon = this.codeIcons[keyTyped];
  }

  constructor(
    private tariffService: TariffService,
    private getPriceService: GetPriceService
  ) {}
}
