import { NgModule } from '@angular/core';
import { CoreEmailModule } from 'ngx-email-pro';

@NgModule({
  imports: [
    CoreEmailModule.forRoot()
  ]
})
export class NgxEmailModule {}
