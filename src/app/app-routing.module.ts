import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LastfmAuthGuard } from './core/guards/lastfm-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    canActivate: [ LastfmAuthGuard ],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'scrobble',
    loadChildren: () => import('./scrobble/scrobble.module').then(m => m.ScrobbleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
