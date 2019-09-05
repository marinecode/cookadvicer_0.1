import { Component, OnInit } from '@angular/core';
import {TypeService} from "../../../services/type.service";
import {Type} from "../../../Model/type";

@Component({
  selector: 'app-type-field',
  templateUrl: './type-field.component.html',
  styleUrls: ['./type-field.component.css']
})
export class TypeFieldComponent  {

  allTypes: Type[] =[];

  constructor( private typeService: TypeService ) {
    this.getAllTypes();
  }

  getAllTypes(){
    this.typeService.getAllTypes().subscribe( ( data: Type[] )=> this.allTypes = data );
  }

}
