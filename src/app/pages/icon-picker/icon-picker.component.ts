import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonIconPickerComponent } from './common-icon-picker/common-icon-picker.component';

interface Icon {
  unicode: string;
  label: string;
  icon: string;
  before: string;
  svg: string | SafeHtml;
}

@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NzPopoverModule, NzButtonModule, CommonIconPickerComponent],
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent {
  selectedIcon: Icon | null = null;
  popoverVisible = false;

  @Output() iconSelected = new EventEmitter<Icon>();
  @Output() iconCleared = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  onIconSelected(icon: Icon) {
    this.selectedIcon = icon;
    this.iconSelected.emit(icon);
    this.popoverVisible = false;
  }

  onIconCleared() {
    this.selectedIcon = null;
    this.iconCleared.emit();
  }

  clearSelection() {
    this.selectedIcon = null;
    this.iconCleared.emit();
  }


}
