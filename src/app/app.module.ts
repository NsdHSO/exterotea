import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TableMaterialModule } from 'ngx-liburg';
import { FrameWholeModule } from 'ngx-liburg-frame-side';
import { IconCoreModule } from 'ngx-liburg-icon';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToDoListInterceptor } from 'ngx-todo-list';
import { environment } from '../environments/environment';
import { CONFIG_MAIN } from './@core/routerConfig';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import {
  IconNameComponent
} from './custom-header/icon-name/icon-name.component';
import {
  reducers
} from './modules/dasboard-planning/store/dashboard-planning.reducer';
import { HttpInterceptorService } from './utils/http-interceptor.service';
import { GetFromCPipe } from './shared/get-from-c.pipe';
import {
  GetMiddleEntityDirective
} from './shared/tooltip/get-middle-entity.directive';
import { MatButtonModule } from '@angular/material/button';

const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [ AppComponent,
    CustomHeaderComponent,
    IconNameComponent,
    GetFromCPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FrameWholeModule.forRoot(CONFIG_MAIN),
    IconCoreModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(maskConfig),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    TableMaterialModule,
    GetMiddleEntityDirective,
    MatButtonModule
  ],
  providers: [
    Store,
    {
      provide: 'env',
      useValue: environment
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToDoListInterceptor,
      multi: true
    },
    MatDatepickerModule
  ],

  bootstrap: [ AppComponent ]
})
/** *************************************************************************************************
 * App module
 */
export class AppModule {
}
