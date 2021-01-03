import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.component.html',
  styleUrls: ['./youtube-downloader.component.css']
})

export class YoutubeDownloaderComponent implements OnInit {

  user_name = "Youtube TonySan";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onConvert(youtube_link: string) {
    console.warn(youtube_link);

    let formData = new FormData();
    formData.append("youtube_link", youtube_link);

    this.http.post<any>('/convert', formData).subscribe(() => {
      console.warn("got response......");
    });
  }
}
