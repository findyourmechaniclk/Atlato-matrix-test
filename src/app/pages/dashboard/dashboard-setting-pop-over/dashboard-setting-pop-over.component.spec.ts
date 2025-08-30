import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSettingPopOverComponent } from './dashboard-setting-pop-over.component';

describe('DashboardSettingPopOverComponent', () => {
  let component: DashboardSettingPopOverComponent;
  let fixture: ComponentFixture<DashboardSettingPopOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSettingPopOverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSettingPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
