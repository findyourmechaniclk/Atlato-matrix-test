// color-picker.component.ts
import { Component } from '@angular/core';
import {
  ColorPickerPopOverComponent,
  ColorValue,
} from '../color-picker-pop-over/color-picker-pop-over.component';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [
    ColorPickerPopOverComponent,
    NzPopoverDirective,
    NgStyle,
    NgClass,
    NgIf,
  ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  isPopoverVisible = false;
  light: ColorValue | undefined;
  dark: ColorValue | undefined;

  receiveColors(colors: { light: ColorValue; dark: ColorValue }) {
    this.light = colors.light;
    this.dark = colors.dark;
  }

  closePopover() {
    this.isPopoverVisible = false;
  }

  // Updated methods to return full ColorValue objects instead of just hex strings
  getInitialLightColor(): ColorValue | undefined {
    return this.light;
  }

  getInitialDarkColor(): ColorValue | undefined {
    return this.dark;
  }

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }
}
