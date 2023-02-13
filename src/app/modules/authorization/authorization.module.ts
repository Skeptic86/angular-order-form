import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationDialogComponent } from './authorization-dialog/authorization-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationButtonComponent } from './authorization-button/authorization-button.component';
import { EnterPhoneNumberComponent } from './enter-phone-number-form/enter-phone-number-form.component';
import { CodeChooseFormComponent } from './code-choose-form/code-choose-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { CodeSendButtonComponent } from './code-send-button/code-send-button.component';
import { ChangeNumberButtonComponent } from './change-number-button/change-number-button.component';

@NgModule({
  declarations: [
    AuthorizationDialogComponent,
    PhoneInputComponent,
    AuthorizationButtonComponent,
    EnterPhoneNumberComponent,
    CodeChooseFormComponent,
    CodeSendButtonComponent,
    ChangeNumberButtonComponent,
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
  ],
})
export class AuthorizationModule {}
