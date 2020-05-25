import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LastfmAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.getToken();
    if (!user) {
      this.router.navigate(['/auth']);
      return false;
    }

    this.userService.setUser(user);

    return true;
  }

  private getToken(): User {
    const token = this.localStorageService.getKey('x-access-token');
    return token ? JSON.parse(token) as User : null;
  }

}
