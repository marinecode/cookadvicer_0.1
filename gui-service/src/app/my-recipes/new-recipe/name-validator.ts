import {Injectable} from "@angular/core";

import {RecipeService} from "../../services/recipe.service";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable(
  {
    providedIn: "root"
  }
)
export class NameValidator implements AsyncValidator{
  constructor( private recipeService: RecipeService ) {
  }


  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let name:string = control.value;
    name = name.substr(0,1).toUpperCase() + name.substr(1);
    return this.recipeService.nameValidate( name )
                .pipe( map ( isValid => isValid? null : { uniqueName: true }),
                  catchError( () => null ));
  }
}
