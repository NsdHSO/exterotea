import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'dashboard',
  loadChildren: () => import('./modules/dasboard-planning/dashboard-planning.module').then((m) => m.DashboardPlanningModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

/** *************************************************************************************************
 * App module routing
 */
export class AppRoutingModule {
}
