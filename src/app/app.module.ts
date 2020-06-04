import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuResourcesComponent } from './core/components/menu-resources/menu-resources.component';
import { MenuHeaderComponent } from './core/components/menu-header/menu-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuResourcesComponent,
    MenuHeaderComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
