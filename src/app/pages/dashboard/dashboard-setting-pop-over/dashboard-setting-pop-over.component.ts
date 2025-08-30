import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-dashboard-setting-pop-over',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './dashboard-setting-pop-over.component.html',
  styleUrls: ['./dashboard-setting-pop-over.component.scss'],
})
export class DashboardSettingPopOverComponent {
  @Input() visible = false;
  @Input() width = '700px';
  @Input() title = '';
  @Input() showClose = true;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
