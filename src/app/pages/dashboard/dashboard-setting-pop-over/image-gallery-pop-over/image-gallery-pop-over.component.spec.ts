import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryPopOverComponent } from './image-gallery-pop-over.component';

describe('ImageGalleryPopOverComponent', () => {
  let component: ImageGalleryPopOverComponent;
  let fixture: ComponentFixture<ImageGalleryPopOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleryPopOverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGalleryPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
