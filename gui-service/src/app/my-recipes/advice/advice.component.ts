
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../services/recipe.service";


export class AdviceComponent {

  adviceResult: string[];
  currentRecipe: Recipe = null;
  downloadedRecipes: Map<string, Recipe> = new Map<string, Recipe>();

  constructor( private recipeService: RecipeService ) { }

  nextRecipe(){
    let recipeName = this.adviceResult.shift();
    this.adviceResult.push( recipeName );
    if( this.downloadedRecipes.has(recipeName) ){
      this.currentRecipe = this.downloadedRecipes.get( recipeName );
    }else{
      this.recipeService.getRecipeByName( recipeName ).subscribe(
        data => { this.currentRecipe = data; this.downloadedRecipes.set( recipeName, this.currentRecipe ) });
    }
  }





}
