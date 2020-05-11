import { Injectable } from '@angular/core';
import { LastfmHttpService } from './lastfm-http.service';
import { HttpClient } from '@angular/common/http';
import { LastfmHttp } from '../models/last-fm-http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastfmService extends LastfmHttpService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public get(data: LastfmHttp): Observable<any> {
    return this.http.get(this.buildURL(data));
  }

  public post(data: LastfmHttp): Observable<any> {
    return this.http.post(this.buildURL(data), null);
  }
}
