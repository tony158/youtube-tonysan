import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatRadioChange} from "@angular/material/radio";
import {DownloadService} from "../download.service";
import {Download} from "../download";
import {Observable} from "rxjs";

const youtubePrefix: string = "https://www.youtube.com/watch?v=";

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  downloadProgress$: Observable<Download> | undefined

  spinner_visible: boolean = false;

  video_duration: string = '';

  selected_format_uuid: string = '';
  video_formats: {
    format_uuid: string;
    file_name: string;
    format_extension: string;
    format_quality: string;
    format_url: string;
    video_duration: string
  }[] = [];

  constructor(private downloadService: DownloadService,
              @Inject(MAT_DIALOG_DATA) public data: { video_id: string, video_title: string, img_url: string },
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDownloadTypes(this.data.video_id);
  }

  onChange(changeEvent: MatRadioChange) {
    this.selected_format_uuid = changeEvent.value;
  }

  getDownloadTypes(video_id: string) {
    let formData = new FormData();
    formData.append("youtube_link", (video_id.includes("youtube.com") ? video_id : `${youtubePrefix}${video_id}`));

    this.spinner_visible = true;
    this.http.post<any>('/download_types', formData).subscribe((response) => {
      this.video_formats = response;

      this.spinner_visible = false;
      this.selected_format_uuid = this.video_formats.length > 0 ? this.video_formats[0].format_uuid : '';
      this.video_duration = this.video_formats.length > 0 ? this.video_formats[0].video_duration : '';
    });
  }

  onDownloadClicked() {
    let fileName = this.getDownloadFileName();
    let downloadURL = this.getDownloadURL();

    this.download({fileName: fileName, url: downloadURL});
  }


  download({fileName, url}: { fileName: string, url: string }) {
    this.downloadProgress$ = this.downloadService.download(url, fileName)
  }

  getDownloadFileName() {
    if (this.video_formats.length > 0) {
      for (let entry of this.video_formats) {
        if (entry.format_uuid == this.selected_format_uuid) {
          return entry.file_name;
        }
      }
    }

    return "";
  }

  getDownloadURL() {
    if (this.video_formats.length > 0) {
      for (let entry of this.video_formats) {
        if (entry.format_uuid == this.selected_format_uuid) {
          return entry.format_url;
        }
      }
    }

    return "";
  }
}
