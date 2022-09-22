import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TableMaterialModule } from 'ngx-liburg';
import { FrameWholeModule } from 'ngx-liburg-frame-side';
import { IconCoreModule } from 'ngx-liburg-icon';
import { environment } from '../environments/environment';
import { CONFIG_MAIN } from './@core/routerConfig';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { reducers } from './modules/dasboard-planning/store/dashboard-planning.reducer';

@NgModule({
  declarations: [AppComponent, CustomHeaderComponent],

  imports: [
    AppRoutingModule,
    BrowserModule,
    DragDropModule,
    FrameWholeModule.forRoot(CONFIG_MAIN),
    IconCoreModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    TableMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [Store, { provide: 'env', useValue: environment }],
  bootstrap: [AppComponent],
})

/** *************************************************************************************************
 * App module
 */
export class AppModule {}
