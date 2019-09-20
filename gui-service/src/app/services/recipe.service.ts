import {Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AppSettings} from "../app-settings";
import {Type} from "../model/type";
import {Ingredient} from "../model/ingredient";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  private apiUrl:string = AppSettings.API_ENDPOINT + AppSettings.Storage_ENDPOINT;
  private recipeUrl: string =this.apiUrl + '/recipe';

  constructor(  private http: HttpClient ) {  }

  getRecipeByName( name: string ): Observable<Recipe>{
    return this.http.get<Recipe>( this.recipeUrl + '/'+ name);
  }

  saveRecipe( recipe:Recipe ): Observable<Recipe>{
    return this.http.post<Recipe>(  this.recipeUrl + '/add', recipe );
  }

  getRecipeNamesByTypename( typeName: string ):Observable<string[]>{
    const options = { params: new HttpParams().set('type', typeName ) };
    return this.http.get<string[]>( this.recipeUrl + '/names/bytype', options );
  }

  getAllRecipesNames(): Observable<string[]>{
    return this.http.get<string[]>(this.recipeUrl + '/names/all');
  }

  nameValidate( name: string ): Observable<boolean>{
    return this.http.get<boolean>( this.recipeUrl + '/validation/name/' + name );
  }

  newRecipe( name:string, type: Type, description: string, ings: Ingredient[], rating:number ): Recipe{
    return {
      id: undefined,
      name: name,
      type: type.name,
      description: description,
      ingredients: ings,
      rating: rating,
      lastPrep: null
    };
  }



}
