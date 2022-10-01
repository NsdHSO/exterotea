import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  public header : HttpHeaders = new HttpHeaders;

  public tokenFromLocalStorage;

  constructor(
    private readonly _httpClient : HttpClient, @Inject('env') private environment : any,
    private readonly _localStorage : LocalStorageService
  ) {
    this.tokenFromLocalStorage = _localStorage.geItem('token');
  }

  public intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.tokenFromLocalStorage)
    });
    return next.handle(modifiedReq);
  }
}
