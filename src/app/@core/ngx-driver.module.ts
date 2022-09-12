import { NgModule } from '@angular/core';
import { CoreDriverModule } from 'ngx-driver';
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [CoreDriverModule.forRoot(environment)],
})
export class NgxDriverModule {}
