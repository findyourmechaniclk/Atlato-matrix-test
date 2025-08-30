import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-image-gallery-pop-over',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './image-gallery-pop-over.component.html',
  styleUrls: ['./image-gallery-pop-over.component.scss'],
})
export class ImageGalleryPopOverComponent {
  @Input() visible = false;
  @Input() gallery: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();

  selectedGalleryImage: any = null;

  selectGalleryImage(img: any): void {
    this.selectedGalleryImage = img;
    this.select.emit(img.url);
  }
}
