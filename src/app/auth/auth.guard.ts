import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkLogin(state.url)
  }

  checkLogin(url: String): boolean | Observable<boolean> {
    if (this.authService.authenticated()) {
      return true
    }

    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: url } })
    return false
  }

}