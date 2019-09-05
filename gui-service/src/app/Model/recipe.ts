import {Ingredient} from "./ingredient";
import {Type} from "./type";

export class Recipe {
  name:string;
  type: Type;
  description: string;
  ingredients: Ingredient[];
  rating: number;
}
