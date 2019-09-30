import { Component, OnInit } from '@angular/core';
import {PostmanService} from "../services/postman.service";
import {State} from "../model/state";
import {MailSettings} from "../model/mailSettings";
import {FormControl} from "@angular/forms";
import {cronValidator} from "./cron-validator";

@Component({
  selector: 'app-postman',
  templateUrl: './postman.component.html',
  styleUrls: ['./postman.component.css']
})
export class PostmanComponent implements OnInit {

  state: State = new State();
  settings: MailSettings = new MailSettings();
  cron:string;
  networkProblem:boolean = false;

  cronForm: FormControl ;

  constructor( private postmanService: PostmanService ) {
    this.cronForm = new FormControl( this.cron , cronValidator() );
  }

  ngOnInit() {
    this.getState();

  }

  send(){
    this.postmanService.send( this.settings ).subscribe(
      state=> {
        this.state = state;
        this.networkProblem = false; },
      error => this.errorHandle( error ));
  }

  stop(){
    this.postmanService.stop().subscribe(
      state=> {
        this.state = state;
        this.networkProblem = false;
        },
      error => {
      this.errorHandle( error );
      });
  }

  getState(){
    this.postmanService.state().subscribe(
      state =>{
        this.state = state;
        this.cronForm.setValue( state.cronExp)
        // this.cron = state.cronExp;
        this.settings.text = state.text;
        this.settings.subject = state.subject;
        this.networkProblem = false ;
        },
      error => this.errorHandle( error ) );
  }

  setCron(){
    this.postmanService.cron( this.cronForm.value ).subscribe(
      state=> {
        this.state = state;
        this.networkProblem = false;
      },
      error => {
        this.errorHandle(error)
      });
  }

  sendNow(){
    this.postmanService.sendNow( this.settings ).subscribe(
      state=> {
        this.state = state;
        this.networkProblem = false;
      },
      error => {
        this.errorHandle( error );
      } );
  }

  private errorHandle( error ){
    if( error.status === 0 ) {
      this.networkProblem = true;
    }
    if( error.status === 409 ) {
      this.state = error.error;
    }
  }
}
