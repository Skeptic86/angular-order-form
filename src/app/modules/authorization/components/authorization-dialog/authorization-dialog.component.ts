import { LocalService } from './../../../../services/local/local.service';
import { tap, Observable, Subscription } from 'rxjs';
import { ICode } from 'src/app/interfaces/code.interface';
import { AuthorizationService } from './../../services/authorization.service';
import { Component } from '@angular/core';
import { IconToCodeType } from 'src/app/enums/icon-to-code-type.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss'],
})
export class AuthorizationDialogComponent {
  formState = 'firstForm';
  phoneNumber?: string;
  codeIcon?: string;
  codeSendInfo?: ICode;
  codeConfirmInfo?: ICode;
  private readonly iconToCodeType = IconToCodeType;

  private convertCodeIconToType(codeIcon: string): number {
    const codeIconEnumKey = codeIcon as keyof typeof this.iconToCodeType;
    return this.iconToCodeType[codeIconEnumKey];
  }

  codeSend(phoneNumber: string, codeIcon: string): Observable<ICode> {
    const fullPhoneNumber = '7' + phoneNumber;
    return this.authorizationService.sendCode(
      fullPhoneNumber,
      this.convertCodeIconToType(codeIcon)
    );
  }

  // codeSendAgain(phoneNumber: string, codeIcon: string): void {
  //   this.codeSend(phoneNumber, codeIcon)
  //     .pipe(tap((value) => console.log(value)))
  //     .subscribe((value) => {
  //       this.codeSendData = value;
  //     });
  // }

  subscribeToCodeSend(phoneNumber: string, codeIcon: string): Subscription {
    return this.codeSend(phoneNumber, codeIcon).subscribe((value) => {
      this.codeSendInfo = value;
    });
  }

  private closeDialogIfCodeSuccess(confirmCodeData: ICode): void {
    console.log(confirmCodeData);
    if (confirmCodeData.success) {
      this.dialogRef.close();
    }
  }

  private putTokenInLocalStorage(token: string): void {
    this.local.saveData('token', token);
  }

  private removeTokenFromLocalStorage(): void {
    this.local.removeData('token');
  }

  codeConfirm(code: string, token: string): Subscription {
    return this.authorizationService
      .confirmCode(code, token)
      .subscribe((value) => {
        this.codeConfirmInfo = value;
        this.putTokenInLocalStorage(this.codeConfirmInfo?.token!);
        this.removeTokenFromLocalStorage();
        this.closeDialogIfCodeSuccess(value);
      });
  }

  toggleShowFirstForm(phoneNumber?: string): void {
    this.setPhoneNumber(phoneNumber);
    if (this.formState === 'firstForm') {
      this.toggleShowSecondForm();
    } else {
      this.formState = 'firstForm';
    }
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

    this.subscribeToCodeSend(this.phoneNumber!, this.codeIcon!);
    this.formState = 'thirdForm';
  }

  toggleShowSecondForm(): void {
    this.formState = 'secondForm';
  }

  constructor(
    private authorizationService: AuthorizationService,
    private dialogRef: MatDialogRef<AuthorizationDialogComponent>,
    private local: LocalService
  ) {}
}
