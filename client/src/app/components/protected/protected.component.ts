import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  constructor(private http: HttpClient, private oauthService: OAuthService) {}

  ngOnInit() {}

  public logout() {
    this.oauthService.logOut();
  }

  public getData() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.oauthService.getAccessToken()
    });

    this.http
      .get('http://localhost:5000/api/demo', {
        headers: headers
      })
      .subscribe(result => {
        console.log(result);
      });
  }
}
