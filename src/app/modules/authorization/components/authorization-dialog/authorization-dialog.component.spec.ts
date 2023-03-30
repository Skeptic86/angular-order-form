import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalService } from './../../../../services/local/local.service';
import { ICode } from 'src/app/interfaces/code.interface';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from './../../services/authorization.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationDialogComponent } from './authorization-dialog.component';

class MockAuthorizationService {
  private apiSendCodeURL =
    'https://dev-api.taxsee.com/client/v1/auth/send-code';

  private apiConfirmCodeURL =
    'https://dev-api.taxsee.com/client/v1/auth/confirm-code';

  sendCode(phone: string, type: number): Observable<ICode> {
    return of({
      success: true,
      message: 'string',
      token: '123',
    });
  }

  confirmCode(code: string, token: string): Observable<ICode> {
    return of({
      success: true,
      message: 'string',
      token: '123',
    });
  }
}

class MockMatDialogRef {
  close() {
    return true;
  }
}

class MockLocalService {
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}

describe('AuthorizationDialogComponent', () => {
  let component: AuthorizationDialogComponent;
  let fixture: ComponentFixture<AuthorizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationDialogComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthorizationService, useClass: MockAuthorizationService },
        { provide: LocalService, useClass: MockLocalService },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convertCodeIconToType', () => {
    //Arrange
    const codeIcon = 'message';
    const expectedIconCode = 0;
    //Assert
    //@ts-ignore
    expect(component.convertCodeIconToType(codeIcon)).toBe(expectedIconCode);
  });

  it('should send code via #codeSend', () => {
    //Arrange
    const codeSendSpy = spyOn(component, 'codeSend').and.returnValue(
      of({
        success: true,
        message: 'string',
        token: '123',
      })
    );
    const phoneNumber = '9224234432';
    const codeIcon = 'message';
    const expectedCode = {
      success: true,
      message: 'string',
      token: '123',
    };
    //Act
    const codeSendResult = component.codeSend(phoneNumber, codeIcon);
    //Assert
    codeSendResult.subscribe((data) => expect(data).toEqual(expectedCode));
    expect(codeSendSpy).toHaveBeenCalledWith(phoneNumber, codeIcon);
  });

  it('should get value via #subscribeToCodeSend', () => {
    //Arrange
    const subscribeToCodeSendSpy = spyOn(
      component,
      'subscribeToCodeSend'
    ).and.returnValue(
      of({
        success: true,
        message: 'string',
        token: '123',
      }).subscribe()
    );
    const phoneNumber = '9224234432';
    const codeIcon = 'message';
    const expectedCodeSubscritpion = of({
      success: true,
      message: 'string',
      token: '123',
    }).subscribe();
    //Act
    const subscribtion = component.subscribeToCodeSend(phoneNumber, codeIcon);
    //Assert
    expect(subscribeToCodeSendSpy).toHaveBeenCalledWith(phoneNumber, codeIcon);
    expect(subscribtion).toEqual(expectedCodeSubscritpion);
  });

  it('should close dialog via #closeDialogIfCodeSuccess', () => {
    //Arrange
    const code = {
      success: true,
      message: 'string',
      token: '123',
    };
    //@ts-ignore
    const dialogrefCloseSpy = spyOn(component.dialogRef, 'close');
    //Act
    //@ts-ignore
    component.closeDialogIfCodeSuccess(code);
    //Assert
    expect(dialogrefCloseSpy).toHaveBeenCalled();
  });

  it('#sendPhoneNumberEvent should #setPhoneNumber', () => {
    //Arrange
    component.formState = 'thirdForm';
    fixture.detectChanges();
    const setPhoneNumberSpy = spyOn(component, 'setPhoneNumber');
    const expectedPhoneNumber = '89224234432';
    const confirmCodeFormEl = fixture.debugElement.query(
      By.css('app-confirm-code-form')
    );
    //Act
    confirmCodeFormEl.triggerEventHandler(
      'sendPhoneNumberEvent',
      '89224234432'
    );
    fixture.detectChanges();
    //Assert
    expect(setPhoneNumberSpy).toHaveBeenCalledWith(expectedPhoneNumber);
  });

  it('shoud put/remove token in localStorage', () => {
    //Arrange
    const token = '123';
    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    const localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem');
    //Act
    //@ts-ignore
    component.putTokenInLocalStorage(token);
    //@ts-ignore
    component.removeTokenFromLocalStorage();
    //Assert
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('token', token);
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('token');
  });
});
