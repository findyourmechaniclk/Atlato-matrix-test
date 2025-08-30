import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DashboardSettingPopOverComponent } from './dashboard-setting-pop-over/dashboard-setting-pop-over.component';

type BackgroundSizeMode = 'fit-width' | 'fit-height' | 'cover' | 'contain' | 'original';

interface LayoutSettingsJson {
  columnsCount: number;
  minLayoutWidth: number;
  marginBetweenWidgets: number;
  applyMarginToSides: boolean;
  autoFillLayoutHeight: boolean;
  backgroundColor: string | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzSwitchModule,
    NzInputModule,
    NzInputNumberModule,
    DashboardSettingPopOverComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {

  isSettingsOpen = false;
  backgroundImage: string | null = null;
  previewImage: string | null = null;
  backgroundSizeMode: BackgroundSizeMode = 'fit-width';
  backgroundSizeModes = [
    { value: 'fit-width', label: 'Fit width' },
    { value: 'fit-height', label: 'Fit height' },
    { value: 'cover', label: 'Cover' },
    { value: 'contain', label: 'Contain' },
    { value: 'original', label: 'Original size' }
  ];

  showLinkInput = false;
  tempImageLink = '';

  // Layout settings for JSON output
  columnsCount = 10;
  minLayoutWidth = 26;
  marginBetweenWidgets = 50;
  applyMarginToSides = true;
  autoFillLayoutHeight = true;
  backgroundColor: string | null = null;

  // Live JSON preview
  settingsPreview: LayoutSettingsJson = this.buildSettingsJson();

  // Gallery
  galleryVisible = false;
  includeSystemImages = false;
  gallery = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
      name: 'Minimalist BakeShop Logo Design.png',
      size: '1.4 MB',
      dimensions: '1024x1024',
    },
    {
      url: 'https://placekitten.com/300/200',
      name: 'Cute Kitten.jpg',
      size: '120 KB',
      dimensions: '300x200',
    },
  ];

  selectedGalleryImage: any = null;

  get backgroundSizeModeCss(): string {
    switch (this.backgroundSizeMode) {
      case 'fit-width': return '100% auto';
      case 'fit-height': return 'auto 100%';
      case 'cover': return 'cover';
      case 'contain': return 'contain';
      case 'original': return 'auto';
      default: return 'cover';
    }
  }

  closeLinkInputRow(): void {
    this.showLinkInput = false; // just close the row; do not modify tempImageLink
  }

  openSettings(): void {
    this.isSettingsOpen = true;
    this.previewImage = this.backgroundImage;
    this.showLinkInput = false;
    this.tempImageLink = '';
    // refresh JSON preview
    this.updateSettingsPreview();
  }

  closeSettings(): void {
    this.isSettingsOpen = false;
    this.showLinkInput = false;
    this.tempImageLink = '';
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = e => this.previewImage = reader.result as string;
  //     reader.readAsDataURL(input.files[0]);
  //   }
  //   this.showLinkInput = false;
  //   this.tempImageLink = '';
  // }

  setImageLink(): void {
    if (this.tempImageLink && this.tempImageLink.trim().length > 0) {
      this.previewImage = this.tempImageLink.trim();
      this.showLinkInput = false;
    }
  }

  clearImageLink(): void {
    this.tempImageLink = '';
    this.showLinkInput = false;
  }

  // JSON helper methods
  private buildSettingsJson(): LayoutSettingsJson {
    return {
      columnsCount: this.columnsCount,
      minLayoutWidth: this.minLayoutWidth,
      marginBetweenWidgets: this.marginBetweenWidgets,
      applyMarginToSides: this.applyMarginToSides,
      autoFillLayoutHeight: this.autoFillLayoutHeight,
      backgroundColor: this.backgroundColor
    };
  }

  updateSettingsPreview(): void {
    this.settingsPreview = this.buildSettingsJson();
  }

  saveSettings(): void {
    // JSON output (added; non-breaking)
    const json = this.buildSettingsJson();
    console.log('Settings JSON output:', json);
    console.log('Settings JSON string:', JSON.stringify(json));

    if (this.showLinkInput && this.tempImageLink && this.tempImageLink.trim().length > 0) {
      this.previewImage = this.tempImageLink.trim();
      this.showLinkInput = false;
    }
    this.backgroundImage = this.previewImage;
    this.closeSettings();
  }

  // Gallery actions
  openGallery(): void {
    this.galleryVisible = true;
    this.selectedGalleryImage = null;
  }
  closeGallery(): void {
    this.galleryVisible = false;
  }
  selectGalleryImage(img: any): void {
    this.previewImage = img.url;
    this.closeGallery();
  }
}

