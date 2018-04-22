import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
  private manager = null;
  private user: User = null;

  constructor(private config: ConfigService) {
    this.init();
  }

  public reset() {
    this.init();
  }

  private init() {
    this.manager = new UserManager(this.config.getClientSettings());
    this.manager.events.addUserLoaded(f => {
      console.log('addUserLoaded...', f);

      console.log(
        'AuthorizationHeaderValue',
        this.getAuthorizationHeaderValue()
      );
      console.log('Claims', this.getClaims());
    });

    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }
}
