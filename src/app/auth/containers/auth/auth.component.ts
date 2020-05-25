import { Component } from '@angular/core';
import { AuthFacade } from '../../auth.facade';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(public facade: AuthFacade) { }

  login() {
    this.facade.auth();
  }

}
