import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {IngService} from "../../../services/ing.service";
import {Ingredient} from "../../../Model/ingredient";

@Component({
  selector: 'app-ingredients-field',
  templateUrl: './ingredients-field.component.html',
  styleUrls: ['./ingredients-field.component.css']
})
export class IngredientsFieldComponent implements OnInit{

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientsCtrl = new FormControl(Validators.required);
  filteredIngs: Observable<Ingredient[]>;
  ingredients: Ingredient[] = [];
  allIngs: Ingredient[] =[];

  @Output() getIngs = new EventEmitter<Ingredient[]>();

  @ViewChild('chipList', {static: false}) chipList: MatChipList;
  @ViewChild('ingInput', {static: false}) ingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  ingsForm:FormControl = new FormControl( this.ingredients, this.validateArrayNotEmpty);

  constructor( private ingService: IngService ) {

    this.getAllIngs();
    this.filteredIngs = this.ingredientsCtrl.valueChanges.pipe(
      startWith(null),
      map((name: string | null) =>
        name ? this._filter(name) : this.allIngs.slice()));
  }

  ngOnInit() {
    // this.ingsForm = this.fb.group({
    //     ings: new FormControl( this.ingredients, this.validateArrayNotEmpty)
    //   }
    // );
    // this.ingsForm.statusChanges.subscribe(
    //   status => {this.chipList.errorState = status === 'INVALID'; console.log(this.chipList.errorState)}
    // );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value.toLowerCase();

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


validateArrayNotEmpty(c: FormControl) {
    // console.log(c.valid + ' chipList -' + this.chipList.errorState);

  if (c.value && c.value.length === 0) {
    return {
      validateArrayNotEmpty: { valid: false }
    };
  }
  return null;
}

}
