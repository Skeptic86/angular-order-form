import { ErrorAuthorizationComponent } from '../error-authorization/error-authorization.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationDialogComponent } from './../../../authorization/authorization-dialog/authorization-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { GetPriceService } from '../../services/get-price/get-price.service';
import { ICalcPrice } from './../../../../interfaces/calc-price.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss'],
})
export class OrderButtonComponent implements OnInit {
  calcPrice?: ICalcPrice;
  disabled: boolean = false;
  clickEventSubscription: Subscription;

  private getPriceString() {
    return this.orderButtonService
      .getPriceString()
      .subscribe((data: ICalcPrice) => {
        this.calcPrice = data;
      });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(AuthorizationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onButtonClick(): void {
    if (
      this.appStateService.getStateValue().addressFrom?.title &&
      this.appStateService.getStateValue().addressTo?.title
    ) {
      this.openDialog();
    } else {
      this.errorSnackBar.openFromComponent(ErrorAuthorizationComponent, {
        duration: 3000,
      });
    }
  }

  ngOnInit(): void {
    this.getPriceString();
  }

  constructor(
    private orderButtonService: OrderButtonService,
    private getPriceService: GetPriceService,
    private appStateService: AppStateService,
    private dialog: MatDialog,
    private errorSnackBar: MatSnackBar
  ) {
    this.clickEventSubscription = this.getPriceService
      .getClickEvent()
      .subscribe(() => {
        this.getPriceString();
      });
  }
}
