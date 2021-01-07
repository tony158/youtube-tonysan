import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  spinner_visible = false;

  selected_format: string = 'Summer';
  video_formats: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDownloadTypes(this.data.video_id);
  }

  getDownloadTypes(video_id: string) {
    console.warn('-----------getDownloadTypes----------------')

    let formData = new FormData();
    formData.append("youtube_link", "https://www.youtube.com/watch?v=" + video_id);

    this.spinner_visible = true;
    this.http.post<any>('/download_types', formData).subscribe((resp) => {
      console.warn('-----------download_types returned----------------')
      console.warn(resp)
      console.warn('-----------download_types returned----------------')

      this.video_formats = resp
      this.spinner_visible = false;
    });
  }

}
