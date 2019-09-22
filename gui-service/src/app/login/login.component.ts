import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserLogin, UserReg} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserLogin = new UserLogin();
  userReg:UserReg = new UserReg();
  repeatPass:string;
  loginErrorMessage: string = '';
  registerErrorMessage: string='';


  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){

    this.authService.login( this.user,
      ()=>{ console.log( this.user.username + ' вошел' );
                      this.router.navigateByUrl('/recipes/allrecipes').then();
                      },
      error => { if(error.status === 0){ this.loginErrorMessage = 'Проблемы с нашим сервером';}
                              if(error.status === 500){ this.loginErrorMessage = 'Неверные данные';}
    else {console.log(error)}});
  }

  //при успешной регистрации сразу логинимся
  register(){
    this.authService.register( this.userReg,
      ()=> { this.authService.login( this.userReg,
        ()=>{ console.log( this.userReg.username + ' вошел' );
                         this.router.navigateByUrl('/recipes/allrecipes').then();},
            error => console.log('Ошибка из метода логин ' +  error.error ));}
        ,error=> { if(error.status === 0){ this.registerErrorMessage = 'Не удалось зарегистрироваться'; }
                              if(error.status===409){this.registerErrorMessage = 'Такой пользователь уже зарегистрирован'}
                              else { console.log( error )}
                     });
  }


}
