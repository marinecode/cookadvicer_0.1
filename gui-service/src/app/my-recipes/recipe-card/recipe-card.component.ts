import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../Model/recipe";
import {HistoryService} from "../../services/history.service";
import {Record} from "../../Model/record";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

 @Input('recipe') recipe: Recipe;


  constructor( private historyService:HistoryService) { }

  ngOnInit() {
  }
  addNewRecord(){
    let rec:Record = this.historyService.newRecord( this.recipe );
    this.historyService.addRecord( rec ).subscribe();
  }
}
