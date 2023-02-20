import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationDialogComponent } from './components/authorization-dialog/authorization-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhoneInputComponent } from './components/first-form/phone-input/phone-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationButtonComponent } from './components/first-form/authorization-button/authorization-button.component';
import { EnterPhoneNumberComponent } from './components/first-form/enter-phone-number-form/enter-phone-number-form.component';
import { CodeChooseFormComponent } from './components/second-form/code-choose-form/code-choose-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { CodeSendButtonComponent } from './components/second-form/code-send-button/code-send-button.component';
import { ChangeNumberButtonComponent } from './components/second-form/change-number-button/change-number-button.component';
import { ConfirmCodeFormComponent } from './components/third-form/confirm-code-form/confirm-code-form.component';
import { CodeInputComponent } from './components/third-form/code-input/code-input.component';
import { RequestCodeButtonComponent } from './components/third-form/request-code-button/request-code-button.component';
import {
  provideEnvironmentNgxMask,
  provideNgxMask,
  NgxMaskDirective,
  NgxMaskPipe,
} from 'ngx-mask';
import { CdTimerModule } from 'angular-cd-timer';
import { FormHeaderComponent } from './components/form-header/form-header.component';

@NgModule({
  declarations: [
    AuthorizationDialogComponent,
    PhoneInputComponent,
    AuthorizationButtonComponent,
    EnterPhoneNumberComponent,
    CodeChooseFormComponent,
    CodeSendButtonComponent,
    ChangeNumberButtonComponent,
    ConfirmCodeFormComponent,
    CodeInputComponent,
    RequestCodeButtonComponent,
    FormHeaderComponent,
  ],
  exports: [AuthorizationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CdTimerModule,
  ],
  providers: [provideNgxMask()],
})
export class AuthorizationModule {}
