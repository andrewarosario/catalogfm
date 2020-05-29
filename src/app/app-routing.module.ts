import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LastfmAuthGuard } from './core/guards/lastfm-auth.guard';
import { LastfmCallbackAuthGuard } from './core/guards/lastfm-callback-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [ LastfmCallbackAuthGuard ],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    canActivate: [ LastfmAuthGuard ],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'scrobble',
    canActivate: [ LastfmAuthGuard ],
    loadChildren: () => import('./scrobble/scrobble.module').then(m => m.ScrobbleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
