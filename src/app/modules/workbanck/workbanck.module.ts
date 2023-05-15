import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { RouterModule, Routes } from '@angular/router';
import { TooltipComponent } from "../../shared/tooltip/tooltip.component";
import { AxisComponent } from "./axis/axis.component";
import { ActualStateDirective } from './actual-state.directive';

const routes: Routes = [ {
  path: '',
  component: BarComponent
} ];

@NgModule({
  declarations: [
    BarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TooltipComponent,
    AxisComponent
  ],

})
export class WorkbanckModule {
}
