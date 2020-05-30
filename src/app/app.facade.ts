import { Injectable } from '@angular/core';
import { UserService } from './core/services/user.service';
import { ScrobbleService } from './scrobble/services/scrobble.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
    private scrobbleService: ScrobbleService,
    private userService: UserService
  ) {}

  public user$ = this.userService.user$;
}
