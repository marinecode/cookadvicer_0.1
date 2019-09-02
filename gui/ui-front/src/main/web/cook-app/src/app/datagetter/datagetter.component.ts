import { Component, OnInit } from '@angular/core';
import {DataserviceService, Ingredient} from "../dataservice.service";

@Component({
  selector: 'app-datagetter',
  templateUrl: './datagetter.component.html',
  styleUrls: ['./datagetter.component.css'],
  providers: [DataserviceService]
})
export class DatagetterComponent implements OnInit {


  ing:Ingredient;
  constructor( private dataServ: DataserviceService ) { }

  showIng() {
    this.dataServ.getData()
      .subscribe( data=> this.ing = data)
  }
  ngOnInit(): void {
  }

}
