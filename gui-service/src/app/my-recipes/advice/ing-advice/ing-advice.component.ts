import { Component, OnInit } from '@angular/core';
import {AdviceService} from "../../../services/advice.service";
import {RecipeService} from "../../../services/recipe.service";
import {Recipe} from "../../../model/recipe";
import {AdviceComponent} from "../advice.component";
import {Ingredient} from "../../../model/ingredient";

@Component({
  selector: 'app-ing-advice',
  templateUrl: './ing-advice.component.html',
  styleUrls: ['./ing-advice.component.css']
})
export class IngAdviceComponent extends AdviceComponent{

  networkProblem:boolean = false;
  noContent:boolean = false;
  selectedIngs: Ingredient[];

  constructor( private adviceService: AdviceService, recipeService: RecipeService ) {
    super( recipeService );
  }

  getIngs( ings: any ){
    this.selectedIngs = ings;
    console.log( this.selectedIngs )
  }

  getIngAdvice(){
     let ingsNames:string[] = this.selectedIngs.map<string>( (i:Ingredient)=> i.name );
     this.adviceService.getIngAdvice( ingsNames ).subscribe(
       (data: string[])=> {
         this.adviceResult = null;
         if(data === null){
           this.noContent = true }
         else{
           this.adviceResult = data;
           this.networkProblem = false;
           this.noContent = false;
           this.nextRecipe();}
         },

       error => {if(error.status === 0) {
                          this.networkProblem = true;
                        }else{
                          console.log(error);}} ,
       )
  }


}
