import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNumberButtonComponent } from './change-number-button.component';

describe('ChangeNumberButtonComponent', () => {
  let component: ChangeNumberButtonComponent;
  let fixture: ComponentFixture<ChangeNumberButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeNumberButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeNumberButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
