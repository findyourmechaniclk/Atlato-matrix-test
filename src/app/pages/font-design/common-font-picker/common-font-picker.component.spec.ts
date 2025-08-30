import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFontPickerComponent } from './common-font-picker.component';

describe('CommonFontPickerComponent', () => {
  let component: CommonFontPickerComponent;
  let fixture: ComponentFixture<CommonFontPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonFontPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonFontPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
