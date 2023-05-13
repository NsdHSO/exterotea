import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'email',
    loadChildren: () =>
      import('./@core/email.module').then(
        (m) => m.NgxEmailModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./@core/product.module').then(
      (m) => m.NgxProductModule)
  },
  {
    path: 'dashboard/:id',
    loadChildren: () =>
      import('./modules/dasboard-planning/dashboard-planning.module').then(
        (m) => m.DashboardPlanningModule
      )
  },
  {
    path: 'dashboard-cow',
    loadChildren: () =>
      import('./@core/dashboard.module').then(
        (m) => m.NgxDashboardModule
      )
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./@core/ngx-driver.module').then(
        (m) => m.NgxDriverModule)
  },
  {
    path: 'cow',
    loadChildren: () =>
      import('./@core/ngx-cow-meat.module').then(
        (m) => m.NgxCowMeatModule)
  },
  {
    path: 'work',
    loadChildren: () =>
      import('./modules/workbanck/workbanck.module').then(
        (m) => m.WorkbanckModule)
  },
  {
    path: 'to-do',
    loadChildren: () =>
      import('./@core/toDo.module').then(
        (m) => m.NgxToDoModule)
  },
  {
    path: 'toDoList',
    loadChildren: () => import('./@core/cow-todolist-module').then(
      (m) => m.NgxCowToDoListModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
/** *************************************************************************************************
 * App module routing
 */
export class AppRoutingModule {
}
