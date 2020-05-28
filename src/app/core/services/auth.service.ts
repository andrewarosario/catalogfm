import { Injectable } from '@angular/core';
import { LastfmAuthService } from '../lastfm/services/lastfm-auth.service';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private lastfmAuthService: LastfmAuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  public authenticate(token: string) {
    return this.lastfmAuthService.authenticate(token)
      .pipe(
        tap(authResponse => this.localStorageService.setKey('x-access-token', JSON.stringify(authResponse.session))),
        tap(authResponse => this.userService.setUser(authResponse.session))
      );
  }

  public getTokenAndSetUser(): User {
    const token = this.localStorageService.getKey('x-access-token');
    if (token) {
      const decodedToken = JSON.parse(token) as User;
      this.userService.setUser(decodedToken);
      return decodedToken;
    }
    return null;
  }
}
