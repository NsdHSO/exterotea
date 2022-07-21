import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPlanningComponent } from './dashboard-planning.component';
import { DashboardPlanningRoutingModule } from './dashboard-planning-routing.module';


@NgModule({
  declarations: [
    DashboardPlanningComponent
  ],
  imports: [
    CommonModule,
    DashboardPlanningRoutingModule
  ]
})

/** *************************************************************************************************
 * Module Planning
 */
export class DashboardPlanningModule {
}
