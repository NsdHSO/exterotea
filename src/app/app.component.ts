import {
  Component,
  OnInit
} from '@angular/core';
import { LocalStorageService } from 'ngx-driver';
import { environment } from '../environments/environment';
import { HttpInterceptorService } from './utils/http-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/** *************************************************************************************************
 * App Component
 */
export class AppComponent implements OnInit {
  title = 'exterotea';

  constructor(
    private readonly _localStorage : LocalStorageService,
    private _httpInterceptor : HttpInterceptorService) {
    this._localStorage.setItem('token', environment.token);
  }

  public ngOnInit() : void {
    this._httpInterceptor.getUser()
      .subscribe((user : any) => {
        this._localStorage.setItem(
          'permission',
          JSON.stringify({ inbox: user.permission.inbox }));
      });
  }
}
