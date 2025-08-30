import { Component, Output, EventEmitter, Input, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';

export interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
  hsv: { h: number; s: number; v: number };
}

export interface DualColorSelection {
  light: ColorValue;
  dark: ColorValue;
}

@Component({
  selector: 'app-color-picker-pop-over',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule],
  templateUrl: './color-picker-pop-over.component.html',
  styleUrls: ['./color-picker-pop-over.component.scss']
})
export class ColorPickerPopOverComponent implements OnInit, OnChanges {
  @Input() initialLightColor: ColorValue | undefined;
  @Input() initialDarkColor: ColorValue | undefined;
  @Input() showAlpha: boolean = true;
  @Input() dualMode: boolean = true; // Enable dual color selection
  @Output() colorChange = new EventEmitter<ColorValue>();
  @Output() dualColorSelect = new EventEmitter<DualColorSelection>();
  @Output() closePopoverEvent = new EventEmitter<boolean>();

  @ViewChild('colorCanvas', { static: true }) colorCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('hueCanvas', { static: true }) hueCanvas!: ElementRef<HTMLCanvasElement>;

  // Active tab management
  activeTab: 'light' | 'dark' = 'light';

  // Color storage for both modes
  lightColor: ColorValue = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
    hex: '#ffffff',
    hsv: { h: 0, s: 0, v: 100 }
  };

  darkColor: ColorValue = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    hex: '#000000',
    hsv: { h: 0, s: 0, v: 0 }
  };

  // Current working color
  get currentColor(): ColorValue {
    return this.activeTab === 'light' ? this.lightColor : this.darkColor;
  }

  set currentColor(value: ColorValue) {
    if (this.activeTab === 'light') {
      this.lightColor = { ...value };
    } else {
      this.darkColor = { ...value };
    }
  }

  colorMode: 'RGBA' | 'HSLA' | 'HEX' = 'RGBA';

  // Selection state tracking - Initialize as true since we're loading previous colors
  lightColorSelected: boolean = true;
  darkColorSelected: boolean = true;

  get canSelect(): boolean {
    return this.dualMode ? (this.lightColorSelected && this.darkColorSelected) : true;
  }

  // Predefined color swatches
  colorSwatches: string[][] = [
    ['#455A64', '#F44336', '#FF9800', '#FFEB3B', '#8BC34A', '#4CAF50', '#009688', '#2196F3', '#673AB7', '#9C27B0', '#E91E63'],
    ['#90A4AE', '#FFCDD2', '#FFE0B2', '#FFF9C4', '#DCEDC8', '#C8E6C9', '#B2DFDB', '#BBDEFB', '#D1C4E9', '#E1BEE7', '#F8BBD9']
  ];

  private isDragging = false;
  private currentDragTarget: 'color' | 'hue' | null = null;

  ngOnInit() {
    this.initializeColors();
    this.setupCanvases();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reinitialize colors when input properties change
    if (changes['initialLightColor'] || changes['initialDarkColor']) {
      this.initializeColors();
      // Only setup canvases if they're already initialized
      if (this.colorCanvas && this.hueCanvas) {
        this.setupCanvases();
      }
    }
  }

  private initializeColors() {
    // Initialize light color from input - now handles full ColorValue object
    if (this.initialLightColor) {
      this.lightColor = { ...this.initialLightColor };
      this.lightColorSelected = true; // Mark as selected since it's a previous selection
    } else {
      // Default light color
      this.lightColor = {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
        hex: '#ffffff',
        hsv: { h: 0, s: 0, v: 100 }
      };
      this.lightColorSelected = false; // Not selected if using default
    }

    // Initialize dark color from input - now handles full ColorValue object
    if (this.initialDarkColor) {
      this.darkColor = { ...this.initialDarkColor };
      this.darkColorSelected = true; // Mark as selected since it's a previous selection
    } else {
      // Default dark color
      this.darkColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
        hex: '#000000',
        hsv: { h: 0, s: 0, v: 0 }
      };
      this.darkColorSelected = false; // Not selected if using default
    }
  }

  switchTab(tab: 'light' | 'dark') {
    this.activeTab = tab;
    this.setupCanvases();
  }

  private setupCanvases() {
    this.drawColorPicker();
    this.drawHueSlider();
  }

  private drawColorPicker() {
    const canvas = this.colorCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create saturation gradient
    const saturationGradient = ctx.createLinearGradient(0, 0, width, 0);
    saturationGradient.addColorStop(0, 'white');
    saturationGradient.addColorStop(1, `hsl(${this.currentColor.hsv.h}, 100%, 50%)`);

    ctx.fillStyle = saturationGradient;
    ctx.fillRect(0, 0, width, height);

    // Create value gradient
    const valueGradient = ctx.createLinearGradient(0, 0, 0, height);
    valueGradient.addColorStop(0, 'rgba(0,0,0,0)');
    valueGradient.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = valueGradient;
    ctx.fillRect(0, 0, width, height);
  }

  private drawHueSlider() {
    const canvas = this.hueCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(0.17, '#ffff00');
    gradient.addColorStop(0.33, '#00ff00');
    gradient.addColorStop(0.5, '#00ffff');
    gradient.addColorStop(0.67, '#0000ff');
    gradient.addColorStop(0.83, '#ff00ff');
    gradient.addColorStop(1, '#ff0000');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  onColorCanvasMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.currentDragTarget = 'color';
    this.updateColorFromCanvas(event);
  }

  onHueCanvasMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.currentDragTarget = 'hue';
    this.updateHueFromCanvas(event);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    if (this.currentDragTarget === 'color') {
      this.updateColorFromCanvas(event);
    } else if (this.currentDragTarget === 'hue') {
      this.updateHueFromCanvas(event);
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.currentDragTarget = null;
  }

  private updateColorFromCanvas(event: MouseEvent) {
    const canvas = this.colorCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width, (event.clientX - rect.left) * (canvas.width / rect.width)));
    const y = Math.max(0, Math.min(canvas.height, (event.clientY - rect.top) * (canvas.height / rect.height)));

    const s = (x / canvas.width) * 100;
    const v = ((canvas.height - y) / canvas.height) * 100;

    const newColor = { ...this.currentColor };
    newColor.hsv = { ...newColor.hsv, s, v };
    this.currentColor = newColor;
    this.updateColorFromHsv();
    this.markColorAsSelected();
  }

  private updateHueFromCanvas(event: MouseEvent) {
    const canvas = this.hueCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width, (event.clientX - rect.left) * (canvas.width / rect.width)));

    const h = (x / canvas.width) * 360;
    const newColor = { ...this.currentColor };
    newColor.hsv = { ...newColor.hsv, h };

    // If saturation is 0, increase it slightly so hue changes are visible
    if (newColor.hsv.s === 0) {
      newColor.hsv.s = 100;
    }

    this.currentColor = newColor;
    this.updateColorFromHsv();
    this.drawColorPicker(); // Redraw color picker with new hue
    this.markColorAsSelected();
  }

  private updateColorFromHsv() {
    const rgb = this.hsvToRgb(this.currentColor.hsv.h, this.currentColor.hsv.s, this.currentColor.hsv.v);
    const newColor = {
      ...this.currentColor,
      ...rgb,
      hex: this.rgbToHex(rgb.r, rgb.g, rgb.b)
    };
    this.currentColor = newColor;
    this.colorChange.emit(this.currentColor);
  }

  private markColorAsSelected() {
    if (this.activeTab === 'light') {
      this.lightColorSelected = true;
    } else {
      this.darkColorSelected = true;
    }
  }

  onRgbaChange() {
    // Preserve the current hue if the color is grayscale
    const previousHue = this.currentColor.hsv.h;
    const newColor = { ...this.currentColor };

    newColor.hex = this.rgbToHex(newColor.r, newColor.g, newColor.b);
    const newHsv = this.rgbToHsv(newColor.r, newColor.g, newColor.b);

    // If the new color is grayscale, keep the previous hue
    if (newHsv.s === 0) {
      newHsv.h = previousHue;
    }

    newColor.hsv = newHsv;
    this.currentColor = newColor;
    this.drawColorPicker();
    this.colorChange.emit(this.currentColor);
    this.markColorAsSelected();
  }

  onHslaChange(property: string, event: any) {
    const value = parseFloat(event.target.value);
    const newColor = { ...this.currentColor };

    switch (property) {
      case 'h':
        newColor.hsv.h = Math.max(0, Math.min(360, value));
        break;
      case 's':
        newColor.hsv.s = Math.max(0, Math.min(100, value));
        break;
      case 'v':
        newColor.hsv.v = Math.max(0, Math.min(100, value));
        break;
    }

    this.currentColor = newColor;
    this.updateColorFromHsv();
    this.markColorAsSelected();
  }

  onHexChange() {
    if (this.currentColor.hex.match(/^#[0-9A-Fa-f]{6}$/)) {
      const rgb = this.hexToRgb(this.currentColor.hex);
      if (rgb) {
        const newColor = {
          ...this.currentColor,
          ...rgb,
          hsv: this.rgbToHsv(rgb.r, rgb.g, rgb.b)
        };
        this.currentColor = newColor;
        this.drawColorPicker();
        this.colorChange.emit(this.currentColor);
        this.markColorAsSelected();
      }
    }
  }

  // Expose Math for template
  Math = Math;

  onSwatchClick(color: string) {
    const rgb = this.hexToRgb(color);
    if (rgb) {
      const newColor = {
        ...rgb,
        a: this.currentColor.a, // Preserve the current alpha value
        hex: color,
        hsv: this.rgbToHsv(rgb.r, rgb.g, rgb.b)
      };
      this.currentColor = newColor;
      this.drawColorPicker();
      this.colorChange.emit(this.currentColor);
      this.markColorAsSelected();
    }
  }

  onClear() {
    const defaultColor = this.activeTab === 'light'
      ? { r: 255, g: 255, b: 255, a: 1, hex: '#ffffff', hsv: { h: this.currentColor.hsv.h, s: 0, v: 100 } }
      : { r: 0, g: 0, b: 0, a: 1, hex: '#000000', hsv: { h: this.currentColor.hsv.h, s: 0, v: 0 } };

    this.currentColor = defaultColor;
    this.drawColorPicker();
    this.colorChange.emit(this.currentColor);

    // Reset selection state
    if (this.activeTab === 'light') {
      this.lightColorSelected = false;
    } else {
      this.darkColorSelected = false;
    }
  }

  onSelect() {
    if (this.dualMode) {
      const dualSelection: DualColorSelection = {
        light: { ...this.lightColor },
        dark: { ...this.darkColor }
      };
      this.dualColorSelect.emit(dualSelection);
      this.closePopoverEvent.emit(false);
    } else {
      this.colorChange.emit(this.currentColor);
    }
  }

  // Utility methods for color conversion
  private hexToRgb(hex: string): {r: number, g: number, b: number} | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
  }

  private rgbToHsv(r: number, g: number, b: number): {h: number, s: number, v: number} {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    let s = max === 0 ? 0 : diff / max;
    let v = max;

    if (diff !== 0) {
      switch (max) {
        case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
      }
      h /= 6;
    } else {
      // If there's no color difference (grayscale), preserve the current hue
      h = this.currentColor?.hsv?.h || 0;
      h /= 360; // Convert to 0-1 range for calculation
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
  }

  private hsvToRgb(h: number, s: number, v: number): {r: number, g: number, b: number} {
    h /= 360;
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1/6) {
      r = c; g = x; b = 0;
    } else if (1/6 <= h && h < 2/6) {
      r = x; g = c; b = 0;
    } else if (2/6 <= h && h < 3/6) {
      r = 0; g = c; b = x;
    } else if (3/6 <= h && h < 4/6) {
      r = 0; g = x; b = c;
    } else if (4/6 <= h && h < 5/6) {
      r = x; g = 0; b = c;
    } else if (5/6 <= h && h < 1) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  close() {
    this.closePopoverEvent.emit();
  }

  constructor(private modal: NzModalService) {}

  showInfoModal(): void {
    this.modal.info({
      nzTitle: 'Are you sure?',
      nzContent: 'Do you want to select these colors?',
      nzOnOk: () => this.onSelect()
    });
  }
}
