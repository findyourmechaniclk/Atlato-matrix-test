import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IconService } from '../icon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Icon {
  unicode: string;
  label: string;
  icon: string;
  before: string;
  svg: string | SafeHtml;
}

@Component({
  selector: 'app-common-icon-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './common-icon-picker.component.html',
  styleUrls: ['./common-icon-picker.component.scss']
})
export class CommonIconPickerComponent implements OnInit {
  @Input() selectedIcon: Icon | null = null;
  @Output() iconSelected = new EventEmitter<Icon>();
  @Output() iconCleared = new EventEmitter<void>();

  icons: Icon[] = [];
  filteredIcons: Icon[] = [];
  loading = false;
  searchTerm = '';
  errorMessage = '';

  constructor(
    private apiService: IconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadIcons();
  }

  loadIcons() {
    this.loading = true;
    this.errorMessage = '';
    this.apiService.callUrl().subscribe({
      next: (res: any) => {
        this.icons = (res.data || []).map((icon: any) => ({
          ...icon,
          svg: this.sanitizer.bypassSecurityTrustHtml(icon.svg)
        }));
        this.filteredIcons = [...this.icons];
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load icons. Please try again.';
        this.loading = false;
        console.error('Icon loading error:', err);
      }
    });
  }

  onSearchChange() {
    if (!this.searchTerm.trim()) {
      this.filteredIcons = [...this.icons];
      return;
    }
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredIcons = this.icons.filter(
      icon =>
        icon.icon.toLowerCase().includes(searchLower) ||
        icon.label.toLowerCase().includes(searchLower)
    );
  }

  selectIcon(icon: Icon) {
    this.iconSelected.emit(icon);
  }

  isSelected(icon: Icon): boolean {
    return this.selectedIcon?.icon === icon.icon;
  }

  clearSelection() {
    this.iconCleared.emit();
  }

  retryLoad() {
    this.loadIcons();
  }

  trackByIcon(_index: number, icon: Icon): string {
    return icon.icon;
  }



}
