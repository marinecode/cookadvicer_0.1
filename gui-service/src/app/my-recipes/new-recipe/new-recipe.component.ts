import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, ViewChild} from '@angular/core';

import {Ingredient} from "../../Model/ingredient";
import {Type} from "../../Model/type";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../Model/recipe";
import {NameValidator} from "./name-validator";
import { FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {
  addedRecipe:Recipe;
  rating:number;
  ingredients: Ingredient[] = [];
  type: Type;
  description:string;

  nameForm: FormControl;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor( private recipeService: RecipeService, private nameValidator: NameValidator){
    this.initForm();
  }

  initForm(){
    this.nameForm = new FormControl( null,
      {validators: [Validators.required],
                     asyncValidators: [ this.nameValidator.validate.bind(this.nameValidator) ],
                     updateOn: 'blur'});
  }

  getIngredients( ings: any[]){
    this.ingredients = ings;
  }

  getType( type: any ){
    this.type = type;
  }

  getRating( rating: any ){
    this.rating = rating;
  }

  addRecipe(){
   let name:string = this.nameForm.value;
   name = name.substr(0,1).toUpperCase() + name.substr(1);
   let newRecipe: Recipe = this.recipeService.newRecipe( name, this.type, this.description, this.ingredients, this.rating);
   this.recipeService.saveRecipe( newRecipe ).subscribe( (recipe :Recipe)=> this.addedRecipe = recipe );
  }


}
