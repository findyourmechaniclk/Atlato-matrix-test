import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';

export interface FontSettings {
  family: string;
  weight: string;
  style: string;
  size: number;
  unit: string;
  lineHeight: number;
  letterSpacing: number;
  textTransform: string;
  textDecoration: string;
  previewText: string;
}

@Component({
  selector: 'app-common-font-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzSelectModule, NzSliderModule, NzInputModule, NzButtonModule, NzModalModule],  templateUrl: './common-font-picker.component.html',
  styleUrls: ['./common-font-picker.component.scss']
})
export class CommonFontPickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() save = new EventEmitter<FontSettings>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('previewBox') previewBox!: ElementRef<HTMLDivElement>;

  fontForm: FormGroup = new FormGroup({});
  previewStyle: any = {};
  private destroy$ = new Subject<void>();

  isVisible: any = false;

  private defaultFontSettings: FontSettings = {
    family: 'Roboto',
    weight: '400',
    style: 'normal',
    size: 18,
    unit: 'px',
    lineHeight: 1.6,
    letterSpacing: 0,
    textTransform: 'none',
    textDecoration: 'none',
    previewText: 'The Quick Brown Fox Jumps Over The Lazy Dog.'
  };

  fontFamilies = ['Roboto', 'Poppins', 'Lato', 'Montserrat', 'Inter', 'Open Sans', 'Oswald', 'Raleway', 'Source Sans Pro', 'Playfair Display'];
  fontWeights = [
    { name: 'Light', value: '300' },
    { name: 'Regular', value: '400' },
    { name: 'Medium', value: '500' },
    { name: 'Semibold', value: '600' },
    { name: 'Bold', value: '700' }
  ];
  fontStyles = ['normal', 'italic'];
  fontSizeUnits = ['px', 'em', 'rem'];
  textTransforms = ['none', 'capitalize', 'uppercase', 'lowercase'];
  textDecorations = ['none', 'underline', 'overline', 'line-through'];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private modalService: NzModalService) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.fontForm = this.fb.group({
      family: [this.defaultFontSettings.family],
      weight: [this.defaultFontSettings.weight],
      style: [this.defaultFontSettings.style],
      size: [this.defaultFontSettings.size],
      unit: [this.defaultFontSettings.unit],
      lineHeight: [this.defaultFontSettings.lineHeight],
      letterSpacing: [this.defaultFontSettings.letterSpacing],
      textTransform: [this.defaultFontSettings.textTransform],
      textDecoration: [this.defaultFontSettings.textDecoration],
      previewText: [this.defaultFontSettings.previewText]
    });
  }

  ngOnInit(): void {
    this.fontForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(values => {
        this.updatePreviewStyle(values);
        this.updatePreviewBoxClass();
      });

    this.updatePreviewStyle(this.fontForm.value);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updatePreviewBoxClass();
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private updatePreviewBoxClass(): void {
    if (this.previewBox) {
      const size = this.fontForm.get('size')?.value || 18;
      const unit = this.fontForm.get('unit')?.value || 'px';

      const calculatedPixelSize = this.calculatePixelSize(size, unit);
      const isLargeText = calculatedPixelSize > 32;

      const element = this.previewBox.nativeElement;
      if (isLargeText) {
        element.classList.add('large-text');
      } else {
        element.classList.remove('large-text');
      }
    }
  }


  private calculatePixelSize(size: number, unit: string): number {
    switch (unit) {
      case 'px':
        return size;
      case 'em':
        return size * 16;
      case 'rem':
        return size * 16;
      default:
        return size;
    }
  }


  private getActualFontSize(size: number, unit: string): string {
    return `${size}${unit}`;
  }


  onSliderChange(value: number | number[]): void {
    const numValue = Array.isArray(value) ? value[0] : value;
    console.log('Slider changed to:', numValue);

    this.fontForm.patchValue({ size: numValue });
  }

  onInputBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);

    if (isNaN(value) || value < 8 || value > 72) {
      const currentValue = this.fontForm.get('size')?.value || 18;
      target.value = currentValue.toString();
      this.fontForm.patchValue({ size: currentValue });
      console.log('Invalid input, reset to:', currentValue);
    }
  }


  private applyTextTransform(text: string, transform: string): string {
    switch (transform) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return text.replace(/\b\w/g, char => char.toUpperCase());
      case 'none':
      default:
        return text.toLowerCase();
    }
  }

  private getWeightName(weightValue: string): string {
    const weightMap: { [key: string]: string } = {
      '300': 'Light', '400': 'Regular', '500': 'Medium', '600': 'Semibold', '700': 'Bold'
    };
    return weightMap[weightValue] || 'Regular';
  }


  private updatePreviewStyle(values: any): void {
    if (!values) return;

    const actualFontSize = this.getActualFontSize(values.size, values.unit);

    console.log('Updating preview style with font size:', actualFontSize);

    this.previewStyle = {
      'font-family': `"${values.family}", sans-serif`,
      'font-weight': values.weight,
      'font-style': values.style,
      'font-size': actualFontSize, // Use actual font size
      'line-height': values.lineHeight,
      'letter-spacing': `${values.letterSpacing}px`,
      'text-transform': values.textTransform,
      'text-decoration': values.textDecoration,
      'overflow-wrap': 'break-word',
      'word-break': 'break-word',
      'hyphens': 'auto'
    };
  }

  public updateForm(settings: FontSettings | null): void {
    const newSettings = settings ? { ...this.defaultFontSettings, ...settings } : this.defaultFontSettings;

    this.fontForm.reset(newSettings);
    this.updatePreviewStyle(newSettings);

    this.cdr.detectChanges();
  }

  public getCurrentFormValue(): FontSettings {
    return this.fontForm.getRawValue();
  }

  onResetButtonClick(): void {
    this.updateForm(null);
  }

  handleSave(currentFontSettings: FontSettings): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Changes',
      nzContent: 'Are you sure you want to save these typography settings?',
      nzOkText: 'Save',
      nzCancelText: 'Cancel',
      nzZIndex: 1050,
      nzOnOk: () => {
        console.log('Font settings saved!', currentFontSettings);
        this.save.emit(currentFontSettings);
      }
    });
  }

  onSaveClick(): void {
    this.handleSave(this.getCurrentFormValue());
  }


  onCancelClick(): void {
    this.cancel.emit();
  }


  get transformedPreviewText(): string {
    const currentText = this.fontForm.get('previewText')?.value || this.defaultFontSettings.previewText;
    const transform = this.fontForm.get('textTransform')?.value || 'none';
    return this.applyTextTransform(currentText, transform);
  }


  get currentFontSize(): string {
    const size = this.fontForm.get('size')?.value || 18;
    const unit = this.fontForm.get('unit')?.value || 'px';
    return `${size}${unit}`;
  }

  get currentLineHeight(): number {
    return this.fontForm.get('lineHeight')?.value || 1.6;
  }

  get currentLetterSpacing(): number {
    return this.fontForm.get('letterSpacing')?.value || 0;
  }

  get currentFontWeightName(): string {
    const weightValue = this.fontForm.get('weight')?.value;
    const weight = this.fontWeights.find(w => w.value === weightValue);
    return weight ? weight.name : 'Regular';
  }


}
