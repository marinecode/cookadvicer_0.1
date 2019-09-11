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


  apiUrl:string = AppSettings.API_ENDPOINT + AppSettings.Storage_ENDPOINT;
  recipeUrl: string =this.apiUrl + '/recipe';

  constructor(  private http: HttpClient ) {  }

  getRecipeByName( name: string ): Observable<Recipe>{
    return this.http.get<Recipe>( this.recipeUrl + '/'+ name).pipe( catchError( this.handleError ));
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

  nameValidate( name:String ): Observable<boolean>{
   return this.http.get(this.recipeUrl + '/validation/name/'+name )
     .pipe( map( value => value === 0) );
  }

  newRecipe( name:string, type: Type, description: string, ings: Ingredient[], rating:number ): Recipe{
    return {
      id: undefined,
      name: name,
      type: type.name,
      description: description,
      ingredients: ings,
      rating: rating
    };
  }

  private handleError( error: HttpErrorResponse ){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
