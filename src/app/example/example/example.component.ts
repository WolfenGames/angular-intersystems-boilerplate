import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements AfterViewInit  {

  constructor(private authService: AuthService) { }

  CurrentUser=""

  ngAfterViewInit(): void {
    this.CurrentUser = this.authService.currentUser()
  }

}
