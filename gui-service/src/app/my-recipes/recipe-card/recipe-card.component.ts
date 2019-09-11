import {Component, Input} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {HistoryService} from "../../services/history.service";
import {Record} from "../../model/record";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {

 @Input('recipe') recipe: Recipe;

  constructor( private historyService:HistoryService) { }

  addNewRecord(){
    let rec:Record = this.historyService.newRecord( this.recipe );
    this.historyService.addRecord( rec ).subscribe();
  }
}
