import { Injectable } from '@angular/core';
import { LastfmUserService } from 'src/app/core/lastfm/services/lastfm-user.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleBulkFacade {

  constructor(
    private lastfmUserService: LastfmUserService,
  ) {}

  public scrobble(text: string): Observable<ScrobbleResponse[]> {
    const tracks: TrackScrobble[] = text
    .split((/\n/))
    .map(line => this.convertLineToTrackScrobble(line));

    return this.scrobbleTracks(tracks);
  }

  private convertLineToTrackScrobble(line: string): TrackScrobble {
    const scrobbleLine = line.split('-');
    return {
      artist: scrobbleLine[0],
      song: scrobbleLine[1],
      album: scrobbleLine[2] || ''
    };
  }

  private scrobbleTracks(tracks: TrackScrobble[]): Observable<ScrobbleResponse[]> {
    const tracksToScrobble = tracks.map(track => this.lastfmUserService.scrobble(track));

    return forkJoin(tracksToScrobble);
  }
}
