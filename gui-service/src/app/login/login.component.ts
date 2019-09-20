import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginControl: FormControl = new FormControl(null, {validators: [Validators.required]});

  constructor() { }

  ngOnInit() {
  }

}
