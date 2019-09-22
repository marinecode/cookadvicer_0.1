import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User, UserLogin, UserReg} from "../model/user";
import {AppSettings} from "../app-settings";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = AppSettings.API_ENDPOINT;
  private authUrl:string = AppSettings.AUTH_ENDPOINT;
  private loginUrl= this.authUrl + '/oauth/token';
  private registerUrl = this.authUrl + '/users/register';

  user: User;

  private eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) {
    if(this.isLoggedIn()){
      this.user = this.parseUser( localStorage.getItem('access_token'));
    }
  }


 public login( user: UserLogin, onSuccess, errorHandle ){

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
                        this.eventEmitter.emit( true );
        }, error => errorHandle(error)
      );
  }

  public register( user: UserReg, onSuccess?, errorHandler? ){
    this.http.post( this.registerUrl, user).subscribe(
      (createdUser:User) =>{ this.user = createdUser;
                                    onSuccess();},
      error => errorHandler(error))
  }

  public logout(){
    localStorage.removeItem('access_token');
    this.eventEmitter.emit(false);
  }

  private setSession( result ){
    localStorage.setItem('access_token', result['access_token'] );
  }

  private parseUser( access_token ):User{
    let user:User = new User();
    user.username = this.jwtHelper.decodeToken( access_token ).user_name;
    return user;
  }

  public isLoggedIn():boolean{
    return !this.jwtHelper.isTokenExpired();
  }

  public subscribe(next?:any, error?, complite? ):Subscription{
    return this.eventEmitter.subscribe( next, error, complite);
  }
}
