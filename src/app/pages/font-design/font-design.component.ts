import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CommonFontPickerComponent, FontSettings } from './common-font-picker/common-font-picker.component';

@Component({
  selector: 'app-font-design',
  standalone: true,
  imports: [ CommonModule, NzButtonModule, NzPopoverModule, NzModalModule, CommonFontPickerComponent ],
  templateUrl: './font-design.component.html',
  styleUrls: ['./font-design.component.scss']
})
export class FontDesignComponent {
  isPopoverVisible = false;
  savedFontSettings: FontSettings | null = null;
  @ViewChild(CommonFontPickerComponent) fontPickerComponent!: CommonFontPickerComponent;

  constructor(private modalService: NzModalService) {}


  handleOpen(): void {
    setTimeout(() => {
      if (this.fontPickerComponent) {
        this.fontPickerComponent.updateForm(this.savedFontSettings);
      }
    });
  }

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }


  handleSave(currentFontSettings: FontSettings): void {
    this.savedFontSettings = currentFontSettings;
    console.log('Font settings saved in parent!', currentFontSettings);
    this.isPopoverVisible = false;
  }


  handleClose(): void {
    this.isPopoverVisible = false;
  }


  get savedSettingsDisplay(): string {
    if (!this.savedFontSettings) return 'No settings saved';

    const { family, weight, size, unit, style, lineHeight, letterSpacing, textTransform, textDecoration } = this.savedFontSettings;
    const weightName = this.getWeightName(weight);

    // More detailed and readable format
    return `${family} ${weightName} ${size}${unit} | Style: ${style} | Line Height: ${lineHeight} | Letter Spacing: ${letterSpacing}px | Transform: ${textTransform} | Decoration: ${textDecoration}`;
  }

  private getWeightName(weightValue: string): string {
    const weightMap: { [key: string]: string } = {
      '300': 'Light', '400': 'Regular', '500': 'Medium', '600': 'Semibold', '700': 'Bold'
    };
    return weightMap[weightValue] || 'Regular';
  }
}
