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
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './my-recipes/new-recipe/new-recipe.component';
import { DescriptionFieldComponent } from './my-recipes/new-recipe/description-field/description-field.component';
import { IngredientsFieldComponent } from './my-recipes/new-recipe/ingredients-field/ingredients-field.component';
import {ReactiveFormsModule} from "@angular/forms";

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
    IngredientsFieldComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
