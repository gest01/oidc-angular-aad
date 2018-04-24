import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { ConfigComponent } from './components/config/config.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },

  {
    path: 'config',
    component: ConfigComponent
  },

  {
    path: 'authcallback',
    component: AuthCallbackComponent
  },

  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
