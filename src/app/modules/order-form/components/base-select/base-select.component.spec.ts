import { AppStateService } from './../../../../services/app-state/app-state.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAppState } from 'src/app/interfaces/app-state.interface';

import { BaseSelectComponent } from './base-select.component';

class MockAppStateService {
  getStateValue(): IAppState {
    return { baseId: 1 };
  }

  setAppState(state: Partial<IAppState>): void {}
}

describe('BaseSelectComponent', () => {
  let component: BaseSelectComponent;
  let fixture: ComponentFixture<BaseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseSelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit #selectedBaseEvent on #selectionChange event', () => {
    //Arrange
    const selectedBaseEventSpy = spyOn(component.selectedBaseEvent, 'emit');
    const matSelectEl = fixture.nativeElement.querySelector('mat-select');
    //Act
    matSelectEl.dispatchEvent(new Event('selectionChange'));
    fixture.detectChanges();
    //Assert
    expect(selectedBaseEventSpy).toHaveBeenCalled();
  });

  it('should emit #selectedBaseEvent on #ngOnInit', () => {
    //Arrange
    const selectedBaseEventSpy = spyOn(component.selectedBaseEvent, 'emit');
    //Act
    component.ngOnInit();
    fixture.detectChanges();
    //Assert
    expect(selectedBaseEventSpy).toHaveBeenCalled();
  });
});
