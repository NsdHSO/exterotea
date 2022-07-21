import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPlanningComponent } from './dashboard-planning.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
    children: [
      { path: '',
        component: DashboardPlanningComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

/** *************************************************************************************************
 * Dashboard module routing
 */
export class DashboardPlanningRoutingModule {
}
