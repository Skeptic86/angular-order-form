import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChooseComponent } from './option-choose.component';

describe('OptionChooseComponent', () => {
  let component: OptionChooseComponent;
  let fixture: ComponentFixture<OptionChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
