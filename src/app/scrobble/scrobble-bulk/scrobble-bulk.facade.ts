import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ScrobbleService } from '../services/scrobble.service';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleBulkFacade {

  constructor(
    private scrobbleService: ScrobbleService,
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
    const tracksToScrobble = tracks.map(track => this.scrobbleService.scrobble(track));

    return forkJoin(tracksToScrobble);
  }
}
