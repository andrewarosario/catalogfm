import { Component, OnInit } from '@angular/core';
import { IndexedDbScrobbles } from 'src/app/indexed-db/tables/indexed-db-scrobbles';
import { ScrobbleService } from 'src/app/scrobble/services/scrobble.service';
import { ScrobbleCacheFacade } from '../../scrobble-cache.facade';

@Component({
  selector: 'app-scrobble-cache',
  templateUrl: './scrobble-cache.component.html',
  styleUrls: ['./scrobble-cache.component.scss']
})
export class ScrobbleCacheComponent implements OnInit {

  links = [
    'Google',
    'Linkedin',
    'Twitter'
  ];
  constructor(
    public facade: ScrobbleCacheFacade
  ) { }

  ngOnInit(): void {
  }

}
