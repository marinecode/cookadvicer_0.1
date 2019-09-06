import { Injectable } from '@angular/core';
import {Recipe} from "../../Model/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../../app-settings";
import {Type} from "../../Model/type";
import {Ingredient} from "../../Model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeUrl: string = '/recipe';
  constructor( private http:HttpClient ) { }

  saveRecipe( recipe:Recipe ): Observable<Recipe>{
    return this.http.post<Recipe>(AppSettings.Storage_ENDPOINT + this.recipeUrl + '/add', recipe );
  }

  newRecipe( name:string, type: Type, description: string, ings: Ingredient[], rating:number ): Recipe{
    let r:Recipe = {
      id: undefined,
      name: name,
      type: type.name,
      description: description,
      ingredients: ings,
      rating: rating
    }
    return r;
  }
}
