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


  constructor( private authService: AuthService ) {
    this.loggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.authService.subscribe(
      event => {this.loggedIn = event;} );
  }

  logout(){
    this.authService.logout();
  }

}
