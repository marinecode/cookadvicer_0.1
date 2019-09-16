import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log( req );
    return next.handle( req ).pipe(
      tap( (event: HttpEvent<any>) => {console.log('CUSTOM INTERCEPTOR'); console.log( event )}
      , (event: HttpEvent<any>) => {console.log('CUSTOM INTERCEPTOR ERROR'); console.log( event )})
    );
  }
}
