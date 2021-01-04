import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.component.html',
  styleUrls: ['./youtube-downloader.component.css']
})

export class YoutubeDownloaderComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onConvert(youtube_link: string) {
    let formData = new FormData();
    formData.append("youtube_link", youtube_link);

    this.http.post<any>('/download', formData).subscribe(() => {
      console.warn("got response......");
    });
  }
}
