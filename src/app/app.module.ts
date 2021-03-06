import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableMaterialModule } from 'ngx-liburg';
import { Store, StoreModule } from '@ngrx/store';
import { IconCoreModule } from 'ngx-liburg-icon';
import { FrameWholeModule } from 'ngx-liburg-frame-side';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { CONFIG_MAIN } from './@core/routerConfig';
import {reducers} from './modules/dasboard-planning/store/dashboard-planning.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './modules/dasboard-planning/store/dashboard.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableMaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DashboardEffects]),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    IconCoreModule,
    FrameWholeModule.forRoot(CONFIG_MAIN
    )
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})

/** *************************************************************************************************
 * App module
 */
export class AppModule {
}
