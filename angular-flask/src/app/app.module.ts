import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {YoutubeDownloaderComponent} from './youtube-downloader/youtube-downloader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {DownloadItemComponent} from './download-item/download-item.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {getSaver, SAVER} from "./saver.provider";


@NgModule({
  declarations: [
    AppComponent,
    YoutubeDownloaderComponent,
    DownloadItemComponent
  ],
  entryComponents: [DownloadItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  providers: [HttpClientModule, {provide: SAVER, useFactory: getSaver}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
