import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableMaterialModule } from 'ngx-liburg';
import { StoreModule } from '@ngrx/store';
import {IconCoreModule} from "ngx-liburg-icon";
import {FrameWholeModule, ParentRouter} from "ngx-liburg-frame-side";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableMaterialModule,
    StoreModule.forRoot({}, {}),
    IconCoreModule,
    FrameWholeModule.forRoot({
      routerDataConfig: [{
        path: "asdasd",
        icon: "fa_solid:arrow-down",
        text: "dasdasd",
        subRouter: [{
          path: "test",
          icon: "fa_solid:person-through-window",
          text: "dasdasd",
        } as ParentRouter]
      },
        {
          path: "reasdasd",
          icon: "fa_solid:person-through-window",
          text: "dasdasd",

          subRouter: [{
            path: "asdad",
            icon: "fa_solid:person-through-window",
            text: "dasdasd",
          } as ParentRouter,
            {
              path: "asda",
              icon: "fa_solid:person-through-window",
              text: "dasdasd",
            } as ParentRouter,{
              path: "dda",
              icon: "fa_solid:person-through-window",
              text: "dasdasd",
            } as ParentRouter,{
              path: "ddd",
              icon: "fa_solid:person-through-window",
              text: "dasdasd",
            } as ParentRouter]
        }],
      iconApp: 'fa_solid:address-book'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

/** *************************************************************************************************
 * App module
 */
export class AppModule {
}
