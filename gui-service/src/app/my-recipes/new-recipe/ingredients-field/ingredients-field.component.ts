import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {IngService} from "../../../services/ing.service";
import {Ingredient} from "../../../Model/ingredient";

@Component({
  selector: 'app-ingredients-field',
  templateUrl: './ingredients-field.component.html',
  styleUrls: ['./ingredients-field.component.css']
})
export class IngredientsFieldComponent{

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientsCtrl = new FormControl();
  filteredIngs: Observable<Ingredient[]>;
  ingredients: Ingredient[] = [];
  allIngs: Ingredient[] =[];

  @Output() getIngs = new EventEmitter<Ingredient[]>();


  @ViewChild('ingInput', {static: false}) ingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor( private ingService: IngService ) {
    this.getAllIngs();
    this.filteredIngs = this.ingredientsCtrl.valueChanges.pipe(
      startWith(null),
      map((name: string | null) =>
        name ? this._filter(name) : this.allIngs.slice()));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      //Добавляем в БД новый ингредиент
      if ((value || '').trim()) {
        let ing:Ingredient = {
          name : value,
          id: undefined };
          this.addIng( ing );
      }
      // Reset the input value
      if (input) {
       input.value = '';
      }
      this.ingredientsCtrl.setValue(null);
    }
  }

  remove(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const name:string = event.option.value;
    this.ingredients.push(this._ingByName(name));
    this.ingInput.nativeElement.value = '';
    this.ingredientsCtrl.setValue(null);
    this.getIngs.emit( this.ingredients );
  }

  private _filter(value: string): Ingredient[] {
    const filterValue: string = value.toLowerCase();

    return this.allIngs.filter(ingredient => ingredient.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _ingByName( name:string ): Ingredient{
    return this.allIngs.filter( ingredient => ingredient.name.toLowerCase() === name.toLowerCase())[0];
  }

  private getAllIngs(){
     this.ingService.getAllIngs().subscribe( (data:Ingredient[]) => this.allIngs = data );
  }

  private addIng( ing: Ingredient ){
    this.ingService.saveIng( ing ).subscribe( ing => this.ingredients.push( ing ));
  }


}
