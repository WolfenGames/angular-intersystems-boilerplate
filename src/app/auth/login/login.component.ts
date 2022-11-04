import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  loading: boolean
  returnUrl: string

  constructor(
    private route: ActivatedRoute,
    private rotuer: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.loading = false
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.returnUrl = '/'
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin() {
    let data = { ...this.form.value }
    const username = data.username
    const password = data.password
    this.loading = true
    this.authService.login(username, password).subscribe(
      data => {
        this.loading = false
        this.rotuer.navigateByUrl(this.returnUrl)
      },
      error => {
        this.loading = false
        this.alertService.error("[Login] wrong username or password")
      }
    )
  }
}
