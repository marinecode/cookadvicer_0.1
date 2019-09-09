import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './my-recipes/new-recipe/new-recipe.component';
import { IngredientsFieldComponent } from './my-recipes/new-recipe/ingredients-field/ingredients-field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IngService} from "./services/ing.service";
import {HttpClientModule} from "@angular/common/http";
import { TypeFieldComponent } from './my-recipes/new-recipe/type-field/type-field.component';
import {TypeService} from "./services/type.service";
import { RatingFieldComponent } from './my-recipes/new-recipe/rating-field/rating-field.component';
import {RecipeService} from "./services/recipe.service";
import {NameValidator} from "./my-recipes/new-recipe/name-validator";
import { AllRecipesComponent } from './my-recipes/all-recipes/all-recipes.component';
import { RecipeCardComponent } from './my-recipes/recipe-card/recipe-card.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MyRecipesComponent,
    NewRecipeComponent,
    IngredientsFieldComponent,
    TypeFieldComponent,
    RatingFieldComponent,
    AllRecipesComponent,
    RecipeCardComponent
  ],
  providers: [IngService, TypeService, RecipeService, NameValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
