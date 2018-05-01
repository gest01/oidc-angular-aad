import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {}
  public getData() {
    const header = new Headers({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    console.log(header);

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', this.authService.getAuthorizationHeaderValue());

    this.http
      .get('http://localhost:5000/api/demo', {
        headers: headers
      })
      .subscribe(result => {
        console.log(result);
      });
  }
}
