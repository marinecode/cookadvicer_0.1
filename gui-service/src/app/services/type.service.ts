import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Type} from "../model/type";
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

  getAllUsedTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(this.typeUrl + '/used');
  }
  saveType( type:Type ): Observable<Type>{
    return this.http.post<Type>( this.typeUrl + '/add', type );
  }


}
