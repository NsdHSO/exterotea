import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ProductCoreModule } from 'ngx-products';

@NgModule({
  declarations: [],
  imports: [
    ProductCoreModule.forRoot()
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true }
    }
  ]
})
export class NgxProductModule {}
