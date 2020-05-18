import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LastfmAuthService } from '../services/lastfm-auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { tap, catchError, map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastfmAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private lastfmAuthService: LastfmAuthService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.localStorageService.getKey('x-access-token');
    if (!token) {
      // this.router.navigate(['/']);
      return true;
    }

    return this.lastfmAuthService.authenticate(token)
      .pipe(
        tap(res => console.log({res})),
        mapTo(true)
      );
  }

}
