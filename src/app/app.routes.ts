import { Routes } from '@angular/router';

import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { IconPickerComponent } from './pages/icon-picker/icon-picker.component';
import { FontDesignComponent } from './pages/font-design/font-design.component';
import {DashboardComponent} from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: ColorPickerComponent },
  { path: 'icon-picker', component: IconPickerComponent },
  { path: 'font-design', component: FontDesignComponent },
  { path: 'dashboard', component: DashboardComponent },
];

