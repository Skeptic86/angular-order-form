import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationButtonComponent } from './authorization-button.component';

describe('AuthorizationButtonComponent', () => {
  let component: AuthorizationButtonComponent;
  let fixture: ComponentFixture<AuthorizationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
