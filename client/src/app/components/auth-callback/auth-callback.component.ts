import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.completeAuthentication().then(
      f => {
        console.log('completeAuthentication...', f);
      },
      error => {
        console.error('ERROR completeAuthentication...', error);
      }
    );
  }
}
