import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { Config, ConfigService } from './services/config.service';

export function getConfiguration(http: HttpClient, config: ConfigService) {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      http.get<Config>('config.json').subscribe(f => {
        config.setConfig(f);
        resolve();
      });
    });
  };
}

@NgModule({
  declarations: [AppComponent, ProtectedComponent, AuthCallbackComponent, LogoutCallbackComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, OAuthModule.forRoot()],
  providers: [
    AuthGuardService,
    ConfigService,

    {
      provide: APP_INITIALIZER,
      deps: [HttpClient, ConfigService],
      useFactory: getConfiguration,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
