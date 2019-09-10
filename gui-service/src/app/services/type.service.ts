import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Type} from "../Model/type";
import {AppSettings} from "../app-settings";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  apiUrl:string = AppSettings.API_ENDPOINT + AppSettings.Storage_ENDPOINT;
  typeUrl: string = this.apiUrl + '/type';


  constructor( private http: HttpClient ) { }

  getAllTypes():Observable<Type[]>{
    return this.http.get<Type[]>(this.typeUrl + '/all');
  }

  saveType( type:Type ): Observable<Type>{
    return this.http.post<Type>( this.typeUrl + '/add', type );
  }

  private handleError( error: HttpErrorResponse ){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
