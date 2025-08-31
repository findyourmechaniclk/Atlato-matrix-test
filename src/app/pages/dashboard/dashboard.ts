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

interface BackgroundSizeModeOption {
  value: string;
  label: string;
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

  // Modal state
  isSettingsOpen = false;

  // Background settings
  backgroundImage: string | null = null;
  backgroundSizeMode: BackgroundSizeMode = 'cover';
  backgroundSizeModes: BackgroundSizeModeOption[] = [
    { value: 'fit-width', label: 'Fit width' },
    { value: 'fit-height', label: 'Fit height' },
    { value: 'cover', label: 'Cover' },
    { value: 'contain', label: 'Contain' },
    { value: 'original', label: 'Original size' }
  ];

  // Layout settings
  columnsCount = 10;
  minLayoutWidth = 26;
  marginBetweenWidgets = 50;
  applyMarginToSides = true;
  autoFillLayoutHeight = true;
  backgroundColor: string | null = null;

  // Settings preview
  settingsPreview: LayoutSettingsJson = this.buildSettingsJson();

  constructor() {
    this.updateSettingsPreview();
  }

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

  openSettings(): void {
    this.isSettingsOpen = true;
    this.updateSettingsPreview();
  }

  closeSettings(): void {
    this.isSettingsOpen = false;
  }

  saveSettings(settingsData: any): void {
    this.columnsCount = settingsData.columnsCount;
    this.minLayoutWidth = settingsData.minLayoutWidth;
    this.marginBetweenWidgets = settingsData.marginBetweenWidgets;
    this.applyMarginToSides = settingsData.applyMarginToSides;
    this.autoFillLayoutHeight = settingsData.autoFillLayoutHeight;
    this.backgroundColor = settingsData.backgroundColor;
    this.backgroundSizeMode = settingsData.backgroundSizeMode;

    if (settingsData.backgroundImage) {
      this.backgroundImage = settingsData.backgroundImage;
    }

    this.updateSettingsPreview();
    this.closeSettings();

    const json = this.buildSettingsJson();
    console.log('Settings JSON output:', json);
  }

  onImageSelected(imageUrl: string): void {
    this.backgroundImage = imageUrl;
    this.updateSettingsPreview();
  }

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
}
