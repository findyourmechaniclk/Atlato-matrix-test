import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerPopOverComponent } from './color-picker-pop-over.component';

describe('ColorPickerPopOverComponent', () => {
  let component: ColorPickerPopOverComponent;
  let fixture: ComponentFixture<ColorPickerPopOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerPopOverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPickerPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
