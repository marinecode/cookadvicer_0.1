import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, NgZone, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-description-field',
  templateUrl: './description-field.component.html',
  styleUrls: ['./description-field.component.css']
})
export class DescriptionFieldComponent {

  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

}
