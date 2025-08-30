import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIconPickerComponent } from './common-icon-picker.component';

describe('CommonIconPickerComponent', () => {
  let component: CommonIconPickerComponent;
  let fixture: ComponentFixture<CommonIconPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonIconPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
