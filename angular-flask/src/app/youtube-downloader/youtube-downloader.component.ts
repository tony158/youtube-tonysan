import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DownloadItemComponent} from "../download-item/download-item.component";

@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.component.html',
  styleUrls: ['./youtube-downloader.component.css']
})

export class YoutubeDownloaderComponent implements OnInit {

  search_text = "";

  linkFormControl = new FormControl('', [
    Validators.required,
  ]);

  search_result_list: { title: string; thumbnail_url: string; video_id: string }[] = [
    {
      title: "1231231231231231231231231aaaaaaaaaaaaaaaaaaaaaaaaaaaaa123123123123123123123",
      video_id: "123123123123123123123123123123123123123123",
      thumbnail_url: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
  ]

  progress_bar_visible = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onConvert(youtube_link: string) {
    let formData = new FormData();
    formData.append("youtube_link", youtube_link);

    this.progress_bar_visible = true;
    this.http.post<any>('/convert', formData).subscribe((resp) => {
      this.search_result_list = resp;
      this.progress_bar_visible = false;
    });
  }

  openDialog(video_id: string, video_title: string, img_url: string): void {
    let dialogData = {data: {video_id: video_id, video_title: video_title, img_url: img_url}};

    let dialogRef = this.dialog.open(DownloadItemComponent, dialogData);

    dialogRef.afterClosed().subscribe(result => {
      console.debug("----------afterClosed-------------")
      console.debug(result);
    })
  }
}
