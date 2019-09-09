import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Ingredient} from "../Model/ingredient";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngService {

  apiUrl: string = AppSettings.API_ENDPOINT + AppSettings.Storage_ENDPOINT;
  ingUrl :string = this.apiUrl + '/ingredient';

  constructor( private http: HttpClient ) { }

  getAllIngs(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(this.ingUrl + '/all');
  }

  saveIng( ing: Ingredient ): Observable<Ingredient>{
    return this.http.post<Ingredient>(this.ingUrl + '/add', ing );
  }
}
