// image-gallery-pop-over.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

interface GalleryImage {
  url: string;
  name: string;
  size: string;
  dimensions: string;
}

@Component({
  selector: 'app-image-gallery-pop-over',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzSwitchModule, FormsModule],
  templateUrl: './image-gallery-pop-over.component.html',
  styleUrls: ['./image-gallery-pop-over.component.scss'],
})
export class ImageGalleryPopOverComponent implements OnInit {
  @Input() visible = false;

  @Output() close = new EventEmitter<void>();
  @Output() imageSelected = new EventEmitter<string>();

  selectedGalleryImage: GalleryImage | null = null;
  includeSystemImages = false;

  gallery: GalleryImage[] = [
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
    {
      url: 'https://picsum.photos/400/300',
      name: 'Random Landscape.jpg',
      size: '89 KB',
      dimensions: '400x300',
    },
    {
      url: 'https://via.placeholder.com/500x350/0066CC/FFFFFF?text=Sample+Image',
      name: 'Sample Blue Background.png',
      size: '45 KB',
      dimensions: '500x350',
    }
  ];

  systemImages: GalleryImage[] = [
    {
      url: 'https://wallpapercave.com/wp/wp2757762.jpg',
      name: 'Mountain Sunset.jpg',
      size: '2.3 MB',
      dimensions: '1920x1080',
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      name: 'Ocean Waves.jpg',
      size: '1.8 MB',
      dimensions: '1920x1080',
    }
  ];

  get displayedGallery(): GalleryImage[] {
    return this.includeSystemImages ? [...this.gallery, ...this.systemImages] : this.gallery;
  }

  ngOnInit(): void {
    // Component initialization if needed
  }

  closeModal(): void {
    this.selectedGalleryImage = null;
    this.close.emit();
  }

  selectGalleryImage(img: GalleryImage): void {
    this.selectedGalleryImage = img;
  }

  confirmSelection(): void {
    if (this.selectedGalleryImage) {
      this.imageSelected.emit(this.selectedGalleryImage.url);
      this.closeModal();
    }
  }

  onSystemImagesToggle(): void {
    // Reset selection when toggling system images
    this.selectedGalleryImage = null;
  }
}
