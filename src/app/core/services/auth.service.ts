import { Injectable } from '@angular/core';
import { LastfmAuthService } from '../lastfm/services/lastfm-auth.service';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

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
        tap(authResponse => this.localStorageService.setKey('key', authResponse.session.key)),
        tap(authResponse => this.userService.setUser(authResponse))
      );
  }
}
