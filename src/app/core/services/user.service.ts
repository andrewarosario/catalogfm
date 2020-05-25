import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject$ = new BehaviorSubject<User>(null);

  constructor() { }

  public get user$(): Observable<User> {
    return this.userSubject$.asObservable();
  }

  public setUser(authResponse: AuthenticationResponse) {
    this.userSubject$.next({ login: authResponse.session.name, session: authResponse });
  }

}
