import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Record} from "../model/record";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
import {Recipe} from "../model/recipe";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

 private historyUrl:string = AppSettings.API_ENDPOINT + AppSettings.Storage_ENDPOINT + '/history';

  constructor( private http: HttpClient ) { }

  addRecord( record: Record): Observable<Record>{
    return this.http.post<Record>( this.historyUrl + '/add', record);
  }

  newRecord( recipe: Recipe ): Record{
    return new Record( recipe );
  }
}
