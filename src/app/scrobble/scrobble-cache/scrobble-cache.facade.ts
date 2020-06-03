import { Injectable } from '@angular/core';
import { ScrobbleService } from '../services/scrobble.service';
import { IndexedDbScrobbles } from 'src/app/indexed-db/tables/indexed-db-scrobbles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrobbleCacheFacade {

  public tracks$ = this.indexedDbScrobbles.collection$;
  constructor(
    private scrobbleService: ScrobbleService,
    private indexedDbScrobbles: IndexedDbScrobbles,
    private matSnackBar: MatSnackBar,
  ) {}


  public scrobbleAndRemoveFromCache(track: TrackScrobble): void {
    this.scrobbleService.scrobbleToLastfm(track)
      .subscribe(
        () => {
          this.indexedDbScrobbles.delete(track.id);
          this.matSnackBar.open('Faixa scrobblada!', 'Ok', { duration: 3000, verticalPosition: 'top'});
        },
        err => this.matSnackBar.open('Não foi possível realizar o scrobble!', 'Ok', { duration: 3000, verticalPosition: 'top'})
      );
  }

  public scrobbleAllAndClearCache(tracks: TrackScrobble[]): void {
    const tracksToScrobble = tracks.map(track => this.scrobbleService.scrobble(track));
    forkJoin(tracksToScrobble).pipe(tap(() => this.clear()))
    .subscribe(
      () => this.matSnackBar.open('Faixas scrobbladas!', 'Ok', { duration: 3000, verticalPosition: 'top'}),
      err => this.matSnackBar.open('Não foi possível realizar os scrobbles!', 'Ok', { duration: 3000, verticalPosition: 'top'})
    );
  }

  public remove(trackId: string): void {
    this.indexedDbScrobbles.delete(trackId);
  }

  public clear(): void {
    this.indexedDbScrobbles.clear();
  }


}
