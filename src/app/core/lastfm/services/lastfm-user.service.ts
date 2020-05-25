import { Injectable } from '@angular/core';
import { LastfmService } from './helpers/lastfm.service';
import { LastfmHttp } from '../models/last-fm-http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LastfmUserService {

  constructor(
    private lastfmService: LastfmService,
    private userService: UserService
  ) { }

  public getInfo(user: string): Observable<UserResponse> {

    const lastfmResponse: LastfmHttp = {
      method: 'user.getInfo',
      data: { user }
    };

    return this.lastfmService.get<UserResponse>(lastfmResponse);
  }

  public getUserRecentTracks(user: string, page = 1): Observable<any> {

    const lastfmResponse: LastfmHttp = {
      method: 'user.getRecentTracks',
      data: {
        user,
        page: page.toString()
      }
    };

    return this.lastfmService.get<any>(lastfmResponse);
  }

  public scrobble(input: TrackScrobble, timestamp: number = moment().unix()): Observable<ScrobbleResponse> {

    const lastfmResponse: LastfmHttp = {
      method: 'track.scrobble',
      data: {
        artist: input.artist,
        track: input.song,
        album: input.album,
        sk: this.userService.user.key,
        timestamp: timestamp.toString(),
      },
      encode: ['album', 'artist', 'track']
    };

    return this.lastfmService.post<ScrobbleResponse>(lastfmResponse);
  }
}
