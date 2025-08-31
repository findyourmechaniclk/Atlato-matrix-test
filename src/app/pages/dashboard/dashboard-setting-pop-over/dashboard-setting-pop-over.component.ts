// dashboard-setting-pop-over.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ImageGalleryPopOverComponent } from './image-gallery-pop-over/image-gallery-pop-over.component';

interface SettingsData {
  columnsCount: number;
  minLayoutWidth: number;
  marginBetweenWidgets: number;
  applyMarginToSides: boolean;
  autoFillLayoutHeight: boolean;
  backgroundColor: string | null;
  backgroundSizeMode: string;
  backgroundSizeModes: Array<{value: string, label: string}>;
  backgroundImage: string | null;
}

@Component({
  selector: 'app-dashboard-setting-pop-over',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputNumberModule,
    NzSwitchModule,
    ImageGalleryPopOverComponent
  ],
  templateUrl: './dashboard-setting-pop-over.component.html',
  styleUrls: ['./dashboard-setting-pop-over.component.scss'],
})
export class DashboardSettingPopOverComponent implements OnChanges {
  @Input() visible = false;
  @Input() settingsData!: SettingsData;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SettingsData>();
  @Output() imageSelected = new EventEmitter<string>();
  @Output() settingsChanged = new EventEmitter<void>();

  // Local form data (copies of the input data)
  formData: SettingsData = {
    columnsCount: 10,
    minLayoutWidth: 26,
    marginBetweenWidgets: 50,
    applyMarginToSides: true,
    autoFillLayoutHeight: true,
    backgroundColor: null,
    backgroundSizeMode: 'cover',
    backgroundSizeModes: [],
    backgroundImage: null
  };

  // Image handling
  previewImage: string | null = null;
  showLinkInput = false;
  tempImageLink = '';

  // Gallery state
  galleryVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settingsData'] && this.settingsData) {
      // Copy input data to form data when settings data changes
      this.formData = { ...this.settingsData };
      this.previewImage = this.settingsData.backgroundImage;
    }
  }

  closeModal(): void {
    this.showLinkInput = false;
    this.tempImageLink = '';
    this.galleryVisible = false;
    this.close.emit();
  }

  saveSettings(): void {
    // Include the preview image in the form data
    const settingsToSave = {
      ...this.formData,
      backgroundImage: this.previewImage
    };

    this.save.emit(settingsToSave);
    this.closeModal();
  }

  onSettingsChange(): void {
    this.settingsChanged.emit();
  }

  // Image Link Handling
  setImageLink(): void {
    if (this.tempImageLink && this.tempImageLink.trim().length > 0) {
      this.previewImage = this.tempImageLink.trim();
      this.showLinkInput = false;
      this.tempImageLink = '';
      this.imageSelected.emit(this.previewImage);
    }
  }

  clearImageLink(): void {
    this.tempImageLink = '';
    this.showLinkInput = false;
  }

  closeLinkInputRow(): void {
    this.showLinkInput = false;
  }

  // Gallery Handling
  openGallery(): void {
    this.galleryVisible = true;
  }

  closeGallery(): void {
    this.galleryVisible = false;
  }

  onGalleryImageSelected(imageUrl: string): void {
    this.previewImage = imageUrl;
    this.imageSelected.emit(imageUrl);
    this.closeGallery();
  }
}
