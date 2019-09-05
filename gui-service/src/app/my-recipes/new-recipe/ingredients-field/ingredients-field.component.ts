import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-ingredients-field',
  templateUrl: './ingredients-field.component.html',
  styleUrls: ['./ingredients-field.component.css']
})
export class IngredientsFieldComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientsCtrl = new FormControl();
  filteredIngs: Observable<string[]>;
  ingredients: string[] = [];
  allIngs: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('ingInput', {static: false}) ingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {

    this.filteredIngs = this.ingredientsCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.allIngs.slice()));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.ingredients.push(value.trim());
      }

      // Reset the input value
      if (input) {
       input.value = '';
      }

      this.ingredientsCtrl.setValue(null);
    }
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingInput.nativeElement.value = '';
    this.ingredientsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngs.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }

}
