import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  arr = [
    {
      value: 'cars',
      title: 'Легковые',
      icon: 'directions_car',
      types: [
        'Эконом', 
        'Комфорт',
        'Бизнес', 
        'Компактвэн, 6 мест', 
        'Минивэн, 7 мест', 
        'Почасовая оплата'
      ]
    },
    {
      value: 'shipping',
      title: 'Доставка',
      icon: 'shopping_bag',
      types: [
        'Курьер', 
        'Купим и привезем'
      ]
    },
    {
      value: 'heavy_cars',
      title: 'Грузовые',
      icon: 'local_shipping',
      types: [
        'Маленький кузов', 
        'Стандартный кузов',
        'Стандартный кузов + 1 грузчик',
        'Стандартный кузов + 2 грузчика',
        'Удлиненный кузов'
      ]
    },
    {
      value: 'buses',
      title: 'Автобусы',
      icon: 'airport_shuttle',
      types: [
        'Автобус до 13 мест', 
        'Автобус до 20 мест'
      ]
    },
    {
      value: 'service',
      title: 'Услуги',
      icon: 'face',
      types: [
        'Грузчик', 
        'Личный водитель',
        'Буксировка',
        'Запуск двигателя'
      ]
    },
  ]

  getTariffArr() {
    return this.arr;
  }

  constructor() { }
}
