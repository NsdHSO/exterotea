import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableMaterialModule} from "ngx-liburg";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TableMaterialModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
