import {Recipe} from "./recipe";

export class Record {
  id: number;
  prep_date: Date;
  recipeId: number;

  constructor( recipe: Recipe ){
    this.recipeId = recipe.id;
  }
}
