import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: []
  },

  {
    path: 'authcallback',
    component: AuthCallbackComponent
  },

  {
    path: 'logout',
    component: LogoutCallbackComponent
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
