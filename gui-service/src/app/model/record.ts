import {Recipe} from "./recipe";

export class Record {
  id: number;
  prepDate: Date;
  recipeName: string;

  constructor( recipe: Recipe ){
    this.recipeName = recipe.name;
  }
}
