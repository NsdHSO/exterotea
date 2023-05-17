import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TooltipComponent } from '../../shared/tooltip/tooltip.component';
import { AxisComponent } from './components/charAxes/axis/axis.component';
import { BarComponent } from './components/charAxes/bar/bar.component';
import { WorkbanckComponent } from './workbanck.component';
import { MatButtonModule } from "@angular/material/button";
import { UsersTComponent } from './components/formsTe/users-t/users-t.component';
import {
  GetMiddleEntityDirective
} from "../../shared/tooltip/get-middle-entity.directive";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [ {
  path: '',
  component: WorkbanckComponent
} ];

@NgModule({
  declarations: [
    BarComponent,
    WorkbanckComponent,
    UsersTComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TooltipComponent,
    AxisComponent,
    MatButtonModule,
    GetMiddleEntityDirective,
    ReactiveFormsModule
  ]

})
export class WorkbanckModule {
}
