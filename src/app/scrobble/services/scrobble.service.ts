import { Injectable } from '@angular/core';
import { LastfmUserService } from 'src/app/core/lastfm/services/lastfm-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { OnlineOfflineService } from 'src/app/core/services/online-offline.service';
import * as moment from 'moment';
import { IndexedDbScrobbles } from 'src/app/core/indexed-db/tables/indexed-db-scrobbles';
import { mapTo } from 'rxjs/operators';
import { ScrobbleResponseType } from 'src/app/core/models/scrobble-response-type';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleService {

  constructor(
    private userService: UserService,
    private lastfmUserService: LastfmUserService,
    private indexedDbScrobbles: IndexedDbScrobbles,
    private onlineOfflineService: OnlineOfflineService
  ) { }

  public scrobble(track: TrackScrobble) {
    return this.isLoggedInLastfm()
      ? this.scrobbleToLastfm(track)
      : this.addScrobbleToIndexedDb(track);
  }

  private scrobbleToLastfm(track: TrackScrobble, timestamp = moment().unix()) {
    return this.lastfmUserService
      .scrobble(this.userService.user.key, track, timestamp)
      .pipe(mapTo(ScrobbleResponseType.Lastfm));
  }

  private addScrobbleToIndexedDb(track: TrackScrobble) {
    return this.indexedDbScrobbles
      .add(track)
      .pipe(mapTo(ScrobbleResponseType.IndexedDb));
  }

  private isLoggedInLastfm(): boolean {
    return !!this.userService.user && this.onlineOfflineService.isOnline;
  }


}
