import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableMaterialModule} from 'ngx-liburg';
import {StoreModule} from '@ngrx/store';
import {IconCoreModule} from 'ngx-liburg-icon';
import {FrameWholeModule, ParentRouter} from 'ngx-liburg-frame-side';
import {CustomHeaderComponent} from './custom-header/custom-header.component';
import {CONFIG_MAIN} from "./@core/routerConfig";

@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableMaterialModule,
    StoreModule.forRoot({}, {}),
    IconCoreModule,
    FrameWholeModule.forRoot(CONFIG_MAIN
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

/** *************************************************************************************************
 * App module
 */
export class AppModule {
}
