import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.component.html',
  styleUrls: ['./youtube-downloader.component.css']
})

export class YoutubeDownloaderComponent implements OnInit {

  linkFormControl = new FormControl('', [
    Validators.required,
  ]);

  search_results = [{
    'title': 'test1',
    'thumbnail_url': 'https://material.angular.io/assets/img/examples/shiba2.jpg'
  }]

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onConvert(youtube_link: string) {
    let formData = new FormData();
    formData.append("youtube_link", youtube_link);

    this.http.post<any>('/convert', formData).subscribe((resp) => {
      console.warn("............got response............");
      console.warn(resp);

      this.search_results = resp;
    });
  }
}
