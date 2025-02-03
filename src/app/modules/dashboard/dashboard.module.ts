import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, NavMenuComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    StudentsModule,
    MatListModule,
  ],
  exports: [DashboardComponent, ToolbarComponent],
  providers: [],
})
export class DashboardModule {}
