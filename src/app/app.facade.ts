import { Injectable } from '@angular/core';
import { UserService } from './core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(private userService: UserService) {}

  public user$ = this.userService.user$;
}
