import {Ingredient} from "./ingredient";


export class Recipe {
  id:number;
  name:string;
  type: string;
  description: string;
  ingredients: Ingredient[];
  rating: number;
  lastPrep: Date;
}
