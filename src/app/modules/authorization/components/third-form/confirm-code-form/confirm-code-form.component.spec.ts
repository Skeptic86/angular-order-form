import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodeFormComponent } from './confirm-code-form.component';

describe('ConfirmCodeFormComponent', () => {
  let component: ConfirmCodeFormComponent;
  let fixture: ComponentFixture<ConfirmCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
