import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "../auth-service.service";


@Injectable()
export class AuthGuard implements CanActivate {
  

    constructor( private authserv: AuthServiceService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean|  Observable<boolean> | Promise<boolean> {
        const isAuth = this.authserv.userIsRegistered;
        if (!isAuth) {
            this.router.navigate(['./home']);
        }
          return isAuth; 
       
    }
}