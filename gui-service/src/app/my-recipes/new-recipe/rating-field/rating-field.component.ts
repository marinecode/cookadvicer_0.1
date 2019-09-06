import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatRadioChange} from "@angular/material";

@Component({
  selector: 'app-rating-field',
  templateUrl: './rating-field.component.html',
  styleUrls: ['./rating-field.component.css']
})
export class RatingFieldComponent {

  rating: number = 1;

  constructor() { }

  @Output() getRating = new EventEmitter<number>( );
  onChange(){
    this.getRating.emit( this.rating );
  }
}
