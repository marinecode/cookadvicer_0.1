import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor( private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log( req );
    return next.handle( req ).pipe(
      tap( (event: HttpEvent<any>) => {console.log('CUSTOM INTERCEPTOR'); console.log( event )}
      , (event: any) => {
        console.log('CUSTOM INTERCEPTOR ERROR');
        console.log( event );
        if( event.status === 401 ) this.router.navigate(["/login"]).then();
      })
    );
  }
}
