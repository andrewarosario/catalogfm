import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  auth() {
    location.href = `http://www.last.fm/api/auth/?api_key=${environment.apiKey}&cb=${encodeURIComponent(`${environment.baseUrl}/callback`)}`;
  }
}
