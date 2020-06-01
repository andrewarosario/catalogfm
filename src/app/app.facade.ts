import { Injectable } from '@angular/core';
import { UserService } from './core/services/user.service';
import { ScrobbleService } from './scrobble/services/scrobble.service';
import { IconsService } from './core/services/icons.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
    private iconsService: IconsService,
    private scrobbleService: ScrobbleService,
    private userService: UserService
  ) {}

  public user$ = this.userService.user$;
}
