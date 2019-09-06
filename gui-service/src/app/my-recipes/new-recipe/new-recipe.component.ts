import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, ViewChild} from '@angular/core';

import {Ingredient} from "../../Model/ingredient";
import {Type} from "../../Model/type";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../../Model/recipe";


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {
  addedRecipe:Recipe;
  name:string;
  rating:number;

  ingredients: Ingredient[] = [];
  type: Type;
  description:string;
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor( private recipeService: RecipeService ){  }


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
   let newRecipe: Recipe = this.recipeService.newRecipe(this.name, this.type, this.description, this.ingredients, this.rating);
   this.recipeService.saveRecipe( newRecipe ).subscribe( (recipe :Recipe)=> this.addedRecipe = recipe );
  }
}
