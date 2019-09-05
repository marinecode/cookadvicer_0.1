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
  MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './my-recipes/new-recipe/new-recipe.component';
import { DescriptionFieldComponent } from './my-recipes/new-recipe/description-field/description-field.component';
import { IngredientsFieldComponent } from './my-recipes/new-recipe/ingredients-field/ingredients-field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IngService} from "./services/ing.service";
import {HttpClientModule} from "@angular/common/http";
import { TypeFieldComponent } from './my-recipes/new-recipe/type-field/type-field.component';
import {TypeService} from "./services/type.service";
import { RatingFieldComponent } from './my-recipes/new-recipe/rating-field/rating-field.component';

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
    FormsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MyRecipesComponent,
    NewRecipeComponent,
    DescriptionFieldComponent,
    IngredientsFieldComponent,
    TypeFieldComponent,
    RatingFieldComponent
  ],
  providers: [IngService, TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
