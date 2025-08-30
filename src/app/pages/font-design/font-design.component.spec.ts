import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDesignComponent } from './font-design.component';

describe('FontDesignComponent', () => {
  let component: FontDesignComponent;
  let fixture: ComponentFixture<FontDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
