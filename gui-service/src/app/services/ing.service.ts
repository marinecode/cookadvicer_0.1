import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Ingredient} from "../Model/ingredient";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngService {

  ingUrl :string = '/ingredient'

  constructor( private http: HttpClient ) { }

  getAllIngs(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(AppSettings.Storage_ENDPOINT + this.ingUrl + '/all');
  }

  saveIng( ing: Ingredient ): Observable<Ingredient>{
    return this.http.post<Ingredient>(AppSettings.Storage_ENDPOINT + this.ingUrl + '/add', ing );
  }
}
