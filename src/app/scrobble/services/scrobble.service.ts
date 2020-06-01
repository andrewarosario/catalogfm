import { Injectable } from '@angular/core';
import { LastfmUserService } from 'src/app/lastfm/services/lastfm-user.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { IndexedDbScrobbles } from 'src/app/indexed-db/tables/indexed-db-scrobbles';
import { mapTo, switchMap, tap, filter } from 'rxjs/operators';
import { ScrobbleResponseType } from 'src/app/core/models/scrobble-response-type';
import { Observable, forkJoin } from 'rxjs';
import { AuthOnlineService } from 'src/app/core/services/auth-online.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleService {

  constructor(
    private userService: UserService,
    private lastfmUserService: LastfmUserService,
    private indexedDbScrobbles: IndexedDbScrobbles,
    private authOnlineService: AuthOnlineService,
    private matSnackBar: MatSnackBar
  ) {
    this.sendScrobblesInCache();
  }

  public scrobble(track: TrackScrobble): Observable<ScrobbleResponseType> {
    return this.authOnlineService.isLogged()
      ? this.scrobbleToLastfm(track)
      : this.addScrobbleToIndexedDb(track);
  }

  private scrobbleToLastfm(track: TrackScrobble, timestamp = moment().unix()): Observable<ScrobbleResponseType> {
    return this.lastfmUserService
      .scrobble(this.userService.user.key, track, timestamp)
      .pipe(mapTo(ScrobbleResponseType.Lastfm));
  }

  private addScrobbleToIndexedDb(track: TrackScrobble): Observable<ScrobbleResponseType> {
    return this.indexedDbScrobbles
      .add(track)
      .pipe(mapTo(ScrobbleResponseType.IndexedDb));
  }

  private sendScrobblesInCache() {

    this.authOnlineService.isLogged$().pipe(
      filter(isLogged => isLogged),
      switchMap(() => this.indexedDbScrobbles.getAll()),
      filter(tracks => !!tracks.length),
      switchMap(scrobbles => forkJoin(scrobbles.map(track => this.scrobbleToLastfm(track)))),
      tap(() => this.indexedDbScrobbles.clear())
    )
    .subscribe(scrobbledTracks => {
      const tracksLength = scrobbledTracks.length;

      const textResponse = `${tracksLength} ${tracksLength > 1
        ? 'faixas foram scrobbladas'
        : 'faixa foi scrobblada'} do cache`;

      this.matSnackBar.open(
        textResponse,
        'Ok',
        { duration: 3000, verticalPosition: 'top'}
      );
    });
  }


}
