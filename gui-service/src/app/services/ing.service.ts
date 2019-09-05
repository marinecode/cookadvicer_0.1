import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Ingredient} from "../Model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngService {

  ingUrl :string = 'storage/ingredient'

  constructor( private http: HttpClient ) { }

  getAllIngs(){
    return this.http.get<Ingredient[]>(AppSettings.API_ENDPOINT + this.ingUrl + '/all');
  }
}
