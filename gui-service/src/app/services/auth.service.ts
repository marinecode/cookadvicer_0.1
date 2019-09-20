import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User, UserLogin} from "../model/user";
import {AppSettings} from "../app-settings";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = AppSettings.API_ENDPOINT;
  private authUrl:string = AppSettings.AUTH_ENDPOINT;
  private loginUrl= this.apiUrl + this.authUrl + '/oauth/token';
  user: User;

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }


  login( user: UserLogin, onSuccess, errorHandle ){

    let authHeader:string = window.btoa("ui:secret");

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic '+authHeader })
    };


    const body: HttpParams = new HttpParams().set('grant_type', 'password')
        .set('username',user.username)
        .set('password',user.password)
        .set('scope', 'webclient');

    this.http.post( this.loginUrl, body.toString(), httpOption )
      .subscribe(
        data => { this.setSession( data );
                        this.user = this.parseUser( data['access_token'] );
                        onSuccess();
        }, error => errorHandle(error)
      );
  }

  private setSession( result ){
    localStorage.setItem('access_token', result['access_token'] );
  }

  private parseUser( result ):User{
    let user:User = new User();
    user.username = this.jwtHelper.decodeToken( result ).user_name;
    return user;
  }
}
