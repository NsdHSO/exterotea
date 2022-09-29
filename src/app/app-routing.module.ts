import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dasboard-planning/dashboard-planning.module').then(
        (m) => m.DashboardPlanningModule
      ),
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./@core/ngx-driver.module').then((m) => m.NgxDriverModule),
  },
  {
    path: 'meat-cow',
    loadChildren: () =>
      import('./@core/ngx-cow-meat.module').then((m) => m.NgxCowMeatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/** *************************************************************************************************
 * App module routing
 */
export class AppRoutingModule {}
