import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-driver';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

/** *************************************************************************************************
 * App Component
 */
export class AppComponent {
  title = 'exterotea';

  constructor(private readonly _localStorage: LocalStorageService) {
    this._localStorage.setItem('token', environment.token);
  }
}
