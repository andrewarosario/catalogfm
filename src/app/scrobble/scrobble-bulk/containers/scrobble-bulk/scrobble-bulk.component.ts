import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrobbleBulkFacade } from '../../scrobble-bulk.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scrobble-bulk',
  templateUrl: './scrobble-bulk.component.html',
  styleUrls: ['./scrobble-bulk.component.scss']
})
export class ScrobbleBulkComponent implements OnInit {

  public scrobbleForm: FormGroup;
  public loadingRequest = false;

  constructor(
    public facade: ScrobbleBulkFacade,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.scrobbleForm = this.formBuilder.group({
      textScrobble: ['', Validators.required]
    });
  }

  scrobble() {
    this.loadingRequest = true;
    const textScrobble = this.scrobbleForm.get('textScrobble').value;
    this.facade.scrobble(textScrobble).subscribe(
      () => this.matSnackBar.open('Faixas scrobbladas com sucesso!', 'Ok', { duration: 3000, verticalPosition: 'top'}),
      err => this.matSnackBar.open('Erro ao scrobblar as faixas!', 'Ok', { duration: 3000, verticalPosition: 'top'}),
      () => this.loadingRequest = false
    );
  }

}
