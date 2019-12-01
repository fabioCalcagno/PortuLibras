
import { Injectable } from '../../../../node_modules/@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../../node_modules/@angular/router';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router'
import { AuthTokenService } from '../header-token/token.service';




@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanActivate {



    constructor(private authTokenService : AuthTokenService,
                private router:Router) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot     ): boolean |
                                                  Observable<boolean> |
                                                  Promise<boolean> 
            {
                console.log("entrou no authGuard");
            if(this.authTokenService.hasHeaderToken()){ 
                return false;
            }return true
             }



}
