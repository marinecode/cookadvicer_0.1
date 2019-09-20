import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserLogin, UserReg} from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserLogin = new UserLogin();
  userReg:UserReg = new UserReg();
  repeatPass:string;
  errorMessage:string = '';

  networkProblem:boolean = false;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
  }

  login(){
    this.authService.login( this.user,
      ()=> console.log( this.user.username + 'вошел' ),
      error => console.log('Ошибка из метода логин ' +  error.error ));
  }

  register(){
    console.log( this.userReg );
  }
}
