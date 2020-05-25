import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LastfmAuthService } from '../services/lastfm-auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { tap, catchError, map, mapTo } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LastfmAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.getToken(next);
    if (!token) {
      this.router.navigate(['/auth']);
      return false;
    }

    return this.authService.authenticate(token)
      .pipe(
        tap(res => console.log({res})),
        mapTo(true)
      );
  }

  private getToken(next: ActivatedRouteSnapshot): string {
    return this.localStorageService.getKey('key') || next.queryParams.token;
  }

}
