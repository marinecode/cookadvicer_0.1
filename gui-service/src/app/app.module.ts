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
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NewRecipeComponent } from './my-recipes/new-recipe/new-recipe.component';
import { IngredientsFieldComponent } from './my-recipes/new-recipe/ingredients-field/ingredients-field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IngService} from "./services/ing.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TypeFieldComponent } from './my-recipes/new-recipe/type-field/type-field.component';
import {TypeService} from "./services/type.service";
import { RatingFieldComponent } from './my-recipes/new-recipe/rating-field/rating-field.component';
import {RecipeService} from "./services/recipe.service";
import {NameValidator} from "./my-recipes/new-recipe/name-validator";
import { AllRecipesComponent } from './my-recipes/all-recipes/all-recipes.component';
import { RecipeCardComponent } from './my-recipes/recipe-card/recipe-card.component';
import {ErrorInterceptor} from "./interceptors/error-interceptor";
import {AdviceService} from "./services/advice.service";
import { SimpleAdviceComponent } from './my-recipes/advice/simple-advice/simple-advice.component';
import { IngAdviceComponent } from './my-recipes/advice/ing-advice/ing-advice.component';
import {AuthService} from "./services/auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {ProtectDirective} from "./directives/protect.directive";


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
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=> {return localStorage.getItem('access_token')},
        whitelistedDomains: ["localhost:8080","localhost:10000","localhost:10001"],
        blacklistedRoutes: ["localhost:8901"],
        throwNoTokenError: true
      }
    }),
    MatRadioModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule
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
    RecipeCardComponent,
    SimpleAdviceComponent,
    IngAdviceComponent,
    ProtectDirective
  ],
  providers: [
    IngService, TypeService, RecipeService, NameValidator, AdviceService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
