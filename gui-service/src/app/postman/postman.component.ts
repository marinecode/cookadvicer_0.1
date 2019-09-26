import { Component, OnInit } from '@angular/core';
import {PostmanService} from "../services/postman.service";

@Component({
  selector: 'app-postman',
  templateUrl: './postman.component.html',
  styleUrls: ['./postman.component.css']
})
export class PostmanComponent implements OnInit {

  message:string ='';

  constructor( private postmanService: PostmanService ) { }

  ngOnInit() {
  }

  send(){
    this.postmanService.send().subscribe( message=> this.message = message );
  }

  stop(){
    this.postmanService.stop().subscribe( message=> this.message = message );
  }
}
