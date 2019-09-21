
import {AuthService} from '../services/auth.service';

import {Directive, Input, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Location, LocationStrategy} from "@angular/common";

@Directive({
  selector: '[appProtected]',
  providers:[Location]
})
export class ProtectDirective implements OnDestroy {
  private sub:any = null;

  @Input("appProtected") protected: boolean = true;

  constructor(private authService: AuthService, private router: Router, private location: Location) {
    if(this.protected) {
      console.log(authService.isLoggedIn());
      if (!authService.isLoggedIn()) {
        this.location.replaceState('/');
        this.router.navigate(['home']).then();
      }
    }
    this.sub = this.authService.subscribe(
      value =>{ if(!value){
      this.location.replaceState('/');
      this.router.navigate(['home']).then();
         }}
      );

  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
