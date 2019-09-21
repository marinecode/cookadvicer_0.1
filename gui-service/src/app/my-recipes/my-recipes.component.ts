import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

  user: User;
  constructor( private authService:AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit() {
  }

}
