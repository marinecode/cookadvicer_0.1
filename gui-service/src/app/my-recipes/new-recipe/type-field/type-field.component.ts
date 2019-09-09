import {Component, EventEmitter, Output} from '@angular/core';
import {TypeService} from "../../../services/type.service";
import {Type} from "../../../Model/type";
import {MatSelectChange} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-type-field',
  templateUrl: './type-field.component.html',
  styleUrls: ['./type-field.component.css']
})
export class TypeFieldComponent  {

  typeControl = new FormControl('',Validators.required );
  allTypes: Type[] =[];


  @Output() getType = new EventEmitter<Type>();

  constructor( private typeService: TypeService ) {
    this.getAllTypes();
  }

  getAllTypes(){
    this.typeService.getAllTypes().subscribe( ( data: Type[] )=> this.allTypes = data );
  }

  emitType( event: MatSelectChange ){
    let t:Type = { name: event.value };
    this.getType.emit( t );
  }

  getErrorMessage() {
    return this.typeControl.hasError('required') ? 'Необходимо выбрать тип':'';
  }
}
