import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private config: ConfigService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      authority: '',
      client_id: '',
      redirect_uri: '',
      post_logout_redirect_uri: '',
      response_type: '',
      scope: '',
      filterProtocolClaims: '',
      monitorSession: '',
      loadUserInfo: ''
    });

    this.form.patchValue(this.config.getClientSettings());
  }

  public save() {
    this.config.setConfig(this.form.value);
    this.auth.reset();
    this.form.patchValue(this.config.getClientSettings());
  }

  public reset() {
    this.config.reset();
  }
}
