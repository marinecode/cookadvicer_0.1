import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule}  from "@angular/material";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatagetterComponent } from './datagetter/datagetter.component';

@NgModule({
  declarations: [
    AppComponent,
    DatagetterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
