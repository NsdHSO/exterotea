import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPlanningComponent } from './dashboard-planning.component';
import {
  DashboardPlanningRoutingModule
} from './dashboard-planning-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import {
  GetMiddleEntityDirective
} from '../../shared/tooltip/get-middle-entity.directive';
import { TooltipComponent } from '../../shared/tooltip/tooltip.component';

@NgModule({
  declarations: [
    DashboardPlanningComponent
  ],
  imports: [
    CommonModule,
    DashboardPlanningRoutingModule,
    DragDropModule,
    MatButtonModule,
    GetMiddleEntityDirective,
    TooltipComponent
  ],
  exports: [
    DragDropModule
  ]
})

/** *************************************************************************************************
 * Module Planning
 */
export class DashboardPlanningModule {
}
