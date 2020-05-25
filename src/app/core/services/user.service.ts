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

  public get user(): User {
    return this.userSubject$.getValue();
  }

  public setUser(authResponse: AuthenticationResponse) {
    const { name, key } = authResponse.session;
    this.userSubject$.next({ name, key });
  }

}
