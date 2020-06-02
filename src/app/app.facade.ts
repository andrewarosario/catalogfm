import { Injectable } from '@angular/core';
import { UserService } from './core/services/user.service';
import { ScrobbleService } from './scrobble/services/scrobble.service';
import { IconsService } from './core/services/icons.service';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  public user$ = this.userService.user$;
  constructor(
    private iconsService: IconsService,
    private scrobbleService: ScrobbleService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  public logout() {
    this.authService.logout();
  }

}
