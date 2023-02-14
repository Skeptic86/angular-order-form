import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSendButtonComponent } from './code-send-button.component';

describe('CodeSendButtonComponent', () => {
  let component: CodeSendButtonComponent;
  let fixture: ComponentFixture<CodeSendButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSendButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
