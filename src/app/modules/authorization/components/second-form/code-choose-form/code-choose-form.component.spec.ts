import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeChooseFormComponent } from './code-choose-form.component';

describe('CodeChooseComponent', () => {
  let component: CodeChooseFormComponent;
  let fixture: ComponentFixture<CodeChooseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeChooseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeChooseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
