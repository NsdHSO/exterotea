import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TooltipComponent } from '../../shared/tooltip/tooltip.component';
import { AxisComponent } from './components/charAxes/axis/axis.component';
import { BarComponent } from './components/charAxes/bar/bar.component';
import { WorkbanckComponent } from './workbanck.component';
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [ {
  path: '',
  component: WorkbanckComponent
} ];

@NgModule({
  declarations: [
    BarComponent,
    WorkbanckComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TooltipComponent,
    AxisComponent,
    MatButtonModule
  ]

})
export class WorkbanckModule {
}
