import { tap, Observable } from 'rxjs';
import { ICode } from './../../../../interfaces/code.interface';
import { AuthorizationService } from './../../services/authorization.service';
import { Component } from '@angular/core';
import { IconToCodeType } from 'src/app/enums/icon-to-code-type.enum';

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
  private readonly iconToCodeType = IconToCodeType;

  //

  private convertCodeIconToType(codeIcon: string): number {
    const codeIconEnumKey = codeIcon as keyof typeof this.iconToCodeType;
    console.log('codeIconEnumKey', codeIconEnumKey);
    console.log(this.iconToCodeType[codeIconEnumKey]);
    return this.iconToCodeType[codeIconEnumKey];
  }

  private codeSend(phoneNumber: string, codeIcon: string): Observable<ICode> {
    console.log('code sended, codeIcon: ', codeIcon);
    const fullPhoneNumber = '7' + phoneNumber;
    console.log(fullPhoneNumber);
    return this.authorizationService.sendCode(
      fullPhoneNumber,
      this.convertCodeIconToType(codeIcon)
    );
  }

  codeSendAgain(phoneNumber: string, codeIcon: string): void {
    console.log('codeSendAgain', codeIcon, this.codeIcon);
    this.codeSend(phoneNumber, codeIcon)
      .pipe(tap((value) => console.log(value)))
      .subscribe((value) => {
        this.codeSendData = value;
      });
  }

  private codeConfirm(code: string): Observable<any> {
    return this.authorizationService.confirmCode(code);
  }

  toggleShowFirstForm(phoneNumber?: string): void {
    this.setPhoneNumber(phoneNumber);

    this.showFirstForm = !this.showFirstForm;
    this.toggleShowSecondForm();
  }

  setPhoneNumber(phoneNumber: string | undefined): void {
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }

  toggleShowThirdForm(codeIcon?: string): void {
    if (codeIcon) {
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

  toggleShowSecondForm(): void {
    this.showSecondForm = !this.showSecondForm;
  }

  constructor(private authorizationService: AuthorizationService) {}
}
