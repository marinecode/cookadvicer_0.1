import {Recipe} from "./recipe";

export class Record {
  id: number;
  prep_date: Date;
  recipeName: string;

  constructor( recipe: Recipe ){
    this.recipeName = recipe.name;
  }
}
