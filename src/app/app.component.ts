import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzMenuModule, NzModalModule, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
