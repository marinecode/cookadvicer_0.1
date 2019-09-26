import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  private postUrl:string = AppSettings.API_ENDPOINT + AppSettings.POST_ENDPOINT;

  constructor( private http:HttpClient ) { }

  send():Observable<string>{
    return this.http.get<string>( this.postUrl +'/send');
  }

  stop():Observable<string>{
    return this.http.get<string>( this.postUrl +'/stop');
  }
}
