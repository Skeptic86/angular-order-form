import { ErrorAuthorizationComponent } from '../error-authorization/error-authorization.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationDialogComponent } from '../../../authorization/components/authorization-dialog/authorization-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { GetPriceService } from '../../services/get-price/get-price.service';
import { ICalcPrice } from 'src/app/interfaces/calc-price.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss'],
})
export class OrderButtonComponent {
  @Input() calcPrice?: ICalcPrice;

  private openDialog(): void {
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

  constructor(
    private appStateService: AppStateService,
    private dialog: MatDialog,
    private errorSnackBar: MatSnackBar
  ) {}
}
