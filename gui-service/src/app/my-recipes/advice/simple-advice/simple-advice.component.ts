import { Component, OnInit } from '@angular/core';
import {TypeService} from "../../../services/type.service";
import {AdviceService} from "../../../services/advice.service";
import {Type} from "../../../model/type";
import {FormControl} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {AdviceComponent} from "../advice.component";

@Component({
  selector: 'app-simple-advice',
  templateUrl: './simple-advice.component.html',
  styleUrls: ['./simple-advice.component.css']
})

export class SimpleAdviceComponent extends AdviceComponent implements OnInit {

  constructor( private typeService: TypeService,
               private adviceService: AdviceService,
               recipeService: RecipeService ) {
    super( recipeService );
  }

  networkProblem:boolean = false;
  allTypes: Type[] = [];
  typeControl: FormControl = new FormControl();

  ngOnInit() {
    this.typeService.getAllUsedTypes().subscribe( data => this.allTypes = data );
  }

  getSimpleAdvice(){
    let types:Type[] = this.typeControl.value;
    let typeNames: string[] = types.map<string>( t=> t.name );
    this.adviceService.getSimpleAdvice( typeNames ).subscribe(
      (data:string[])=> {this.adviceResult = data;
                              this.networkProblem = false;},
      error => {if(error.status === 0 ) {
                        this.networkProblem = true
                      }else{
                        console.log(error);
                      } },
      () => this.nextRecipe());
  }
}
