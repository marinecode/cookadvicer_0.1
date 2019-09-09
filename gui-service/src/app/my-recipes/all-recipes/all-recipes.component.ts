import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {TypeService} from "../../services/type.service";
import {Type} from "../../Model/type";
import {MatSidenav} from "@angular/material";
import {Recipe} from "../../Model/recipe";


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  allTypes: Type[];
  recipeNames: string[];
  selectedType: string;
  selectedRecipe: Recipe;
  @ViewChild('recipesnav', { static: false }) recipeSnav: MatSidenav;

  constructor( private typeService: TypeService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.typeService.getAllTypes().subscribe( (data:Type[])=> this.allTypes = data , error => console.log( error ));
  }

  showRecipeNames( event: any ){
    let typename: string = event.target.value;
    this.selectedType = typename;
    this.recipeService.getRecipeNamesByTypename( typename ).subscribe( (data: string[]) => this.recipeNames = data );
    this.recipeSnav.open().then(r=>r);
  }

  showAllRecipeNames( event: any ){
    let allNamesCommand: string = event.target.value;
    this.selectedType = allNamesCommand;
    this.recipeService.getAllRecipesNames( ).subscribe( (data: string[]) => this.recipeNames = data );
    this.recipeSnav.open().then(r=>r);
  }

  showRecipe( event: any ){
    let recipeName: string = event.target.value;
    this.recipeService.getRecipeByName( recipeName ).subscribe((data: Recipe)=> this.selectedRecipe = data,
      error => console.log( error ));
  }



}
