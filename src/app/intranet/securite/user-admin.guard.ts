import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UService } from 'src/app/services/u.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminGuard implements CanActivate {

  constructor(private userService:UService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Verification du statut de l'utilisateur
    if (this.userService.user && this.userService.user.statut === 'admin') {
      return true;
    }

    // Redirection à la page login si l'utilisateur n'est pas admin
    return this.userService.redirectToLogPage();
  }
  
}
