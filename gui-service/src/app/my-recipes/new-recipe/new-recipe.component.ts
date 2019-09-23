import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, ViewChild} from '@angular/core';

import {Ingredient} from "../../model/ingredient";
import {Type} from "../../model/type";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../model/recipe";
import {NameValidator} from "./name-validator";
import { FormControl, Validators} from "@angular/forms";
import {TypeFieldComponent} from "./type-field/type-field.component";
import {IngredientsFieldComponent} from "./ingredients-field/ingredients-field.component";
import {RatingFieldComponent} from "./rating-field/rating-field.component";


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  @ViewChild('ratingField', {static: false }) ratingField: RatingFieldComponent;
  @ViewChild('typeField', {static: false}) typeField: TypeFieldComponent;
  @ViewChild('ingField', {static: false}) ingField: IngredientsFieldComponent;

  addedRecipe:Recipe;
  rating:number;
  ingredients: Ingredient[] = [];
  type: Type;
  description:string;

  nameForm: FormControl;
  message: string;

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
   this.recipeService.saveRecipe( newRecipe ).subscribe(
     (recipe :Recipe)=> this.addedRecipe = recipe,
     error => this.message = 'Похоже проблемы с сервером или интернетом',
     () => {this.message = 'Рецепт '+ this.addedRecipe.name +' сохранен!'; this.refreshForm()});
  }

  refreshForm(){
    this.nameForm.reset();
    this.ingredients=[];
    this.ingField.resetIngField();
    this.description='';
    this.rating=undefined;
    this.ratingField.resetRatingField();
    this.type = undefined;
    this.typeField.resetSelectedType();
  }


}
