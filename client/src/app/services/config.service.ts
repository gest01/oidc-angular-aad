import { Injectable } from '@angular/core';
import { UserManagerSettings } from 'oidc-client';
import Oidc = require('oidc-client');

@Injectable()
export class ConfigService {
  private currentConfig: any;

  constructor() {
    this.currentConfig = this.getDefaultConfig();
  }

  public getClientSettings(): UserManagerSettings {
    return this.currentConfig;
  }

  public reset() {
    this.currentConfig = this.getDefaultConfig();
  }

  public setConfig(config: any) {
    console.log('setting config..', config);
    //  this.currentConfig = config;
  }

  // 'https://login.microsoftonline.com/stefangeigeroutlook.onmicrosoft.com/.well-known/openid-configuration',
  // https://github.com/IdentityModel/oidc-client-js/wiki
  private getDefaultConfig(): any {
    Oidc.Log.logger = console;
    Oidc.Log.level = Oidc.Log.INFO;
    return <UserManagerSettings>{
      metadataUrl: 'openid-configuration.json',
      authority: 'openid-configuration.json',
      client_id: '0f911654-6ac1-476c-9b06-4aeb3520d9fa',
      redirect_uri: 'http://localhost:4200/authcallback?',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'id_token',
      scope: 'openid profile',
      filterProtocolClaims: true,
      monitorSession: true
      // loadUserInfo: true
    };
  }
}
