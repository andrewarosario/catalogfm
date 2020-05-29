import { Injectable } from '@angular/core';
import { LastfmUserService } from 'src/app/core/lastfm/services/lastfm-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { OnlineOfflineService } from 'src/app/core/services/online-offline.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleService {

  constructor(
    private userService: UserService,
    private lastfmUserService: LastfmUserService,
    private onlineOfflineService: OnlineOfflineService
  ) { }

  public scrobbleToLastfm(track: TrackScrobble, timestamp = moment().unix()) {
    return this.lastfmUserService.scrobble(this.userService.user.key, track, timestamp);
  }


}
