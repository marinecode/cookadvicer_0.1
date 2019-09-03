import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatToolbarModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    MyRecipesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
