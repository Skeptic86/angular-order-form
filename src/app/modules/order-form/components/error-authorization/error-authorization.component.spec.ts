import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAuthorizationComponent } from './error-authorization.component';

describe('ErrorAuthorizationComponent', () => {
  let component: ErrorAuthorizationComponent;
  let fixture: ComponentFixture<ErrorAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
