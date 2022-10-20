import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EthernetPopupsComponent } from './ethernet-popups/ethernet-popups.component';
import { SelectedPhotoComponent } from './selected-photo/selected-photo.component';
import { SubmitSelectedPhotoComponent } from './submit-selected-photo/submit-selected-photo.component';
import { ClearMetadataComponent } from './clear-metadata/clear-metadata.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    EthernetPopupsComponent,
    SelectedPhotoComponent,
    SubmitSelectedPhotoComponent,
    ClearMetadataComponent,
    SuccessModalComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
