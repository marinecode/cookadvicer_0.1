import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../Model/type";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  typeUrl: string = AppSettings.Storage_ENDPOINT + '/type';


  constructor( private http: HttpClient ) { }

  getAllTypes():Observable<Type[]>{
    return this.http.get<Type[]>(this.typeUrl + '/all');
  }

  saveType( type:Type ): Observable<Type>{
    return this.http.post<Type>( this.typeUrl + '/add', type );
  }
}
