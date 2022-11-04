import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  // TODO: Get this from env | config
  authApiUrl: string = environment.endpoint

  isLogin = new BehaviorSubject<boolean>(this.authenticated())

  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null as any)

  constructor(private http: HttpClient, private router: Router) {
    // Deprecated bad code :P
    // Wont work on chrome 🙃
    document.execCommand('ClearAuthenticationCache', false)

    this._token
      .asObservable()
      .subscribe(
        _token => {
          // User token has changed.
          // We don't need to do something here, but if we needed to we could
        }
      )
  }

  public authenticated(): boolean {
    // Converting a null to string might cause problems later on :/
    const currentUser: any = JSON.parse(localStorage.getItem('user') as string)
    const token = currentUser && currentUser.token
    if (token) {
      if (this._token) {
        this._token.next(token)
      }
      return true
    }
    return false
  }

  public login(username: string, password: string): Observable<string> {
    let basicHeader = btoa(encodeURI(username + ":" + password))
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', 'Basic ' + basicHeader)
    headers = headers.set('Cache-Control', 'no-cache')

    return this.http
      .get<any>(this.authApiUrl, {
        headers
      }).
      pipe(
        map(data => {
          let token = `Basic ${basicHeader}`
          localStorage.setItem('user', JSON.stringify({ username, token }))
          this._token.next(token)
          setTimeout(() => {
            this.isLogin.next(true)
          })
          return username
        }),
        catchError(err => {
          console.log(err)
          this.logout();
          return throwError(() => err)
        })
      )
  }

  public logout(): void {
    localStorage.removeItem('user')
    setTimeout(() => {
      this.isLogin.next(false)
    })
  }

  currentUser(): string {
    const currentUser = JSON.parse(localStorage.getItem('user') as string)
    return currentUser.username
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('user') as string)
    const token = currentUser && currentUser.token
    return token
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable()
  }
}
