import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularIntersystemsBoilerplate';

  isLoggedIn$!: Observable<boolean>
  loading = true
  CurrentUser = ""

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.CurrentUser = this.authService.currentUser();
    this.loading = false
  }
}
