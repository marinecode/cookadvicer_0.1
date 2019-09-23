import {Component, EventEmitter, Output} from '@angular/core';
import {TypeService} from "../../../services/type.service";
import {Type} from "../../../model/type";
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
  addTypeField: boolean = false;
  newType:string;
  message:string;
  networkProblem:boolean = false;

  @Output() getType = new EventEmitter<Type>();

  constructor( private typeService: TypeService ) {
    this.getAllTypes();
  }

  getAllTypes(){
    this.typeService.getAllTypes().subscribe( ( data: Type[] )=> this.allTypes = data,
      error => { if(error.status === 0 ) this.networkProblem = true;} );
  }

  emitType( event: MatSelectChange ){
    let t:Type = { name: event.value };
    this.getType.emit( t );
  }

  getErrorMessage() {
    return this.typeControl.hasError('required') ? 'Необходимо выбрать тип':'';
  }

  showAddTypeField(){
    this.addTypeField = !this.addTypeField;
  }

  addType(){
    let type: Type = { name: this.newType.toLowerCase() };
    this.typeService.saveType( type ).subscribe({
      error: err => this.message = err.name ,
      complete: () => {
        this.message = 'Тип добавлен';
        this.allTypes.push( type );
        this.newType = '';}
    });
  }

  resetSelectedType(){
    this.typeControl.reset();
  }
}

