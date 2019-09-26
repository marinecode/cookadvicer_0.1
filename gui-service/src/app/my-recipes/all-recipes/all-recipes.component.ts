import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {TypeService} from "../../services/type.service";
import {Type} from "../../model/type";
import {MatSidenav} from "@angular/material";
import {Recipe} from "../../model/recipe";


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

  constructor( private typeService: TypeService,
               private recipeService: RecipeService) { }

  ngOnInit() {
    this.typeService.getAllUsedTypes().subscribe( (data:Type[])=> this.allTypes = data );
  }

  showRecipeNamesByType( event: any ){
    let typename: string = event.target.value;
    this.selectedType = typename;
    this.recipeService.getRecipeNamesByTypename( typename ).subscribe( (data: string[]) => this.recipeNames = data );
    this.recipeSnav.open().then();
  }

  showAllRecipeNames( event: any ){
    this.selectedType = event.target.value;
    this.recipeService.getAllRecipesNames( ).subscribe( (data: string[]) => this.recipeNames = data );
    this.recipeSnav.open().then();
  }

  showRecipe( event: any ){
    let recipeName: string = event.target.value;
    this.recipeService.getRecipeByName( recipeName ).subscribe((data: Recipe)=> this.selectedRecipe = data,
      error => console.log( error ));
  }

}
