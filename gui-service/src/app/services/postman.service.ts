import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
import {MailSettings} from "../model/mailSettings";
import {State} from "../model/state";

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  private postUrl:string = AppSettings.API_ENDPOINT + AppSettings.POST_ENDPOINT;

  constructor( private http:HttpClient ) { }

  send( settings: MailSettings ):Observable<State>{
    return this.http.post<State>( this.postUrl +'/send', settings );
  }

  stop():Observable<State>{
    return this.http.get<State>( this.postUrl +'/stop');
  }

  cron( cronExp: string ): Observable<State>{
    let exp: string = '"'+cronExp+'"';
    const param = {params: new HttpParams().set( 'exp', exp )};
    return this.http.get<State>( this.postUrl + '/cron', param );
  }

  sendNow( settings: MailSettings ): Observable<State>{
    return this.http.post<State>( this.postUrl + '/sendnow', settings );
  }

  state(): Observable<State>{
    return this.http.get<State>( this.postUrl + '/state');
  }
}
