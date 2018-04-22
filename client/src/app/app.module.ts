import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { ConfigService } from './services/config.service';
import { ConfigComponent } from './components/config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function getConfiguration(http: HttpClient, config: ConfigService) {
  console.log('APP_INITIALIZER STARTING');
  return () => {
    http.get('openid-configuration.json').subscribe(f => {
      console.log('result', f);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    AuthCallbackComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
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
