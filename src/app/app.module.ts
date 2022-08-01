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
import { reducers } from './modules/dasboard-planning/store/dashboard-planning.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DragDropModule,
    FrameWholeModule.forRoot(CONFIG_MAIN),
    IconCoreModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    TableMaterialModule

  ],
  providers: [Store],
  bootstrap: [AppComponent]
})

/** *************************************************************************************************
 * App module
 */
export class AppModule {
}
