import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCodeButtonComponent } from './request-code-button.component';

describe('RequestCodeButtonComponent', () => {
  let component: RequestCodeButtonComponent;
  let fixture: ComponentFixture<RequestCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCodeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
