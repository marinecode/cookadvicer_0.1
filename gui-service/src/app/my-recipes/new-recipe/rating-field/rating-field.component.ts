import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatRadioChange, MatRadioGroup} from "@angular/material";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rating-field',
  templateUrl: './rating-field.component.html',
  styleUrls: ['./rating-field.component.css']
})
export class RatingFieldComponent {

  rating: FormControl = new FormControl('1');

  constructor() { }

  @Output() getRating = new EventEmitter<number>( );
  onChange(){
    this.getRating.emit( this.rating.value );
  }

  resetRatingField(){
    this.rating.setValue('1');
  }

}
