import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setHeaders(req))
  }

  setHeaders(req: HttpRequest<any>) {
    if (!req.headers.has('Authorization')) {
      req = req.clone({
        setHeaders: { Authorization: this.authService.getToken() }
      })
    }
    return req
  }
}