import { Injectable } from '@angular/core';
import { LastfmService } from './helpers/lastfm.service';
import { LastfmHttp } from '../models/last-fm-http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastfmArtistService {

  constructor(private lastfmService: LastfmService) { }

  getArtist(artist: string): Observable<ArtistInfoResponse> {

    const lastfmResponse: LastfmHttp = {
      method: 'artist.getInfo',
      data: { artist },
      encode: ['artist']
    };

    return this.lastfmService.get<ArtistInfoResponse>(lastfmResponse);
  }
}
