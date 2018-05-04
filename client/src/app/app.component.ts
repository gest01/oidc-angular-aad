import { Component } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private configService: ConfigService, private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    const config = this.configService.getConfig();
    authConfig.clientId = config.clientId;
    authConfig.redirectUri = config.redirectUri;
    authConfig.scope = config.scope;
    authConfig.resource = config.resource;

    console.log('setting up OAuthService', authConfig);

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    const url = config.metadataUrl;
    this.oauthService.loadDiscoveryDocument(url).then(p => {
      this.oauthService.tryLogin().then(l => {
        if (this.oauthService.hasValidAccessToken()) {
          this.oauthService.setupAutomaticSilentRefresh();
        }
      });
    });
  }
}

// https://github.com/manfredsteyer
export const authConfig: AuthConfig = {
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true,
  requireHttps: false,

  // https://stackoverflow.com/a/31245525
  resource: 'https://graph.windows.net/'
};
