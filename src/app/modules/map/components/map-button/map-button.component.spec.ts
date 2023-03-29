import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { MapButtonComponent } from './map-button.component';

class MockMatDialog {}

describe('MapButtonComponent', () => {
  let component: MapButtonComponent;
  let fixture: ComponentFixture<MapButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapButtonComponent],
      providers: [{ provide: MatDialog, useClass: MockMatDialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(MapButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open dialog on click', () => {
    //Arrange
    const buttonEl: HTMLElement = fixture.nativeElement.querySelector('button');
    const changeNumberEventSpy = spyOn(component, 'openMapDialog');
    //Act
    buttonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    //Assert
    expect(changeNumberEventSpy).toHaveBeenCalled();
  });
});
