import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Observable} from "rxjs";
import {Recipe} from "../model/recipe";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  constructor( private http: HttpClient, private recipeService: RecipeService ) { }

  private apiUrl: string = AppSettings.API_ENDPOINT + AppSettings.ADVICE_ENDPOINT+'/advisor';



  public getSimpleAdvice ( typeNames: string[] ): Observable<string[]>{
    let params:HttpParams = new HttpParams();
    typeNames.forEach( t=> params = params.append('types', t));
    const options= { params: params };

    return this.http.get<string[]>( this.apiUrl + '/simple', options );
  }




  getIngAdvice( ings: string[] ) : Observable<string[]>{
    let params:HttpParams = new HttpParams();
    ings.forEach( i=> params = params.append('ings', i));
    const options= { params: params };

    return this.http.get<string[]>( this.apiUrl + '/byings', options );
  }


}
