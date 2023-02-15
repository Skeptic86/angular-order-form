import { tap, Observable } from 'rxjs';
import { ICode } from './../../../../interfaces/code.interface';
import { AuthorizationService } from './../../services/authorization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss'],
})
export class AuthorizationDialogComponent {
  showFirstForm = true;
  showSecondForm = false;
  showThirdForm = false;
  phoneNumber?: string;
  private codeSendData?: ICode;
  codeIcon?: string;

  //

  private convertCodeIconToType(codeIcon: string): number {
    let codeType = 0;
    if (codeIcon === 'call') {
      codeType = 1;
    }
    return codeType;
  }

  private codeSend(phoneNumber: string, codeIcon: string): Observable<ICode> {
    console.log('code sended');
    const fullPhoneNUmber = '7' + phoneNumber;
    return this.authorizationService.sendCode(
      fullPhoneNUmber,
      this.convertCodeIconToType(codeIcon)
    );
  }

  codeSendAgain(phoneNumber: string, codeIcon: string) {
    this.codeSend(phoneNumber, codeIcon)
      .pipe(tap((value) => console.log(value)))
      .subscribe((value) => {
        this.codeSendData = value;
      });
  }

  private codeConfirm(code: string) {
    return this.authorizationService.confirmCode(code);
  }

  toggleShowFirstForm(phoneNumber?: string) {
    this.setPhoneNumber(phoneNumber);

    this.showFirstForm = !this.showFirstForm;
    this.toggleShowSecondForm();
  }

  setPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }

  sendRequestCode() {
    this.authorizationService.sendCode(
      this.phoneNumber!,
      this.convertCodeIconToType(this.codeIcon!)
    );
  }

  toggleShowThirdForm(codeIcon?: string) {
    if (this.codeIcon) {
      this.codeIcon = codeIcon;
    }
    this.codeSend(this.phoneNumber!, this.codeIcon!)
      .pipe(tap((value) => console.log(value)))
      .subscribe((value) => {
        this.codeSendData = value;
      });
    this.showThirdForm = !this.showThirdForm;
    this.toggleShowSecondForm();
  }

  toggleShowSecondForm() {
    this.showSecondForm = !this.showSecondForm;
  }

  constructor(private authorizationService: AuthorizationService) {}
}
