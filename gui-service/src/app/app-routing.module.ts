import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MyRecipesComponent} from "./my-recipes/my-recipes.component";
import {NewRecipeComponent} from "./my-recipes/new-recipe/new-recipe.component";
import {AllRecipesComponent} from "./my-recipes/all-recipes/all-recipes.component";
import {SimpleAdviceComponent} from "./my-recipes/advice/simple-advice/simple-advice.component";
import {IngAdviceComponent} from "./my-recipes/advice/ing-advice/ing-advice.component";
import {PostmanComponent} from "./postman/postman.component";

const recipeRouts: Routes=[
  {path: 'newrecipe', component: NewRecipeComponent},
  {path: 'allrecipes', component: AllRecipesComponent},
  {path: 'simpleAdvice', component: SimpleAdviceComponent},
  {path: 'ingAdvice', component: IngAdviceComponent}
  ];

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recipes', component: MyRecipesComponent, children: recipeRouts },
  {path: 'postman', component: PostmanComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
