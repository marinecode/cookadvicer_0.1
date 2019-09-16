import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MyRecipesComponent} from "./my-recipes/my-recipes.component";
import {NewRecipeComponent} from "./my-recipes/new-recipe/new-recipe.component";
import {AllRecipesComponent} from "./my-recipes/all-recipes/all-recipes.component";
import {AdviceComponent} from "./my-recipes/advice/advice.component";
import {SimpleAdviceComponent} from "./my-recipes/advice/simple-advice/simple-advice.component";
import {IngAdviceComponent} from "./my-recipes/advice/ing-advice/ing-advice.component";

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
  {path: 'login/registration', component: RegistrationComponent},
  {path: 'recipes', component: MyRecipesComponent, children: recipeRouts }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
