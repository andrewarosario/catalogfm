import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule
  ],
})
export class CoreModule {}
