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
    return this.recipeService.nameValidate( control.value )
                .pipe( map ( isValid => isValid? null : { uniqueName: true }),
                  catchError( () => null ));
  }
}
