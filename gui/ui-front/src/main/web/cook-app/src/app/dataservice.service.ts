import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Ingredient {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor( private http: HttpClient) {  }
  dbUrl = 'http://localhost:8080/storage'
  ingUrl = '/ingredient/1'
  getData(): Observable<Ingredient>{
    return this.http.get<Ingredient>( this.dbUrl + this.ingUrl  );
  }
}
