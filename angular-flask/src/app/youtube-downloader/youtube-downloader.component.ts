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

  search_result_list = [{
    'title': 'test1',
    'thumbnail_url': 'https://material.angular.io/assets/img/examples/shiba2.jpg'
  }]

  search_in_progress = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onConvert(youtube_link: string) {
    let formData = new FormData();
    formData.append("youtube_link", youtube_link);

    this.search_in_progress = true;
    this.http.post<any>('/convert', formData).subscribe((resp) => {
      this.search_result_list = resp;
      this.search_in_progress = false;
    });
  }
}
