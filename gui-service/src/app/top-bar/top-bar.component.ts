import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../model/user";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {



  loggedIn: boolean;
  isAdmin:boolean = false;

  constructor( private authService: AuthService ) {
    this.loggedIn = this.authService.isLoggedIn();
    console.log( this.authService.user.role );
    if( this.loggedIn ){
      this.isAdmin = this.authService.user.role.includes('ROLE_ADMIN');
    }
  }

  ngOnInit() {
    this.authService.subscribe(
      event => {this.loggedIn = event;} );
  }

  logout(){
    this.authService.logout();
  }

}
