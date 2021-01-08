import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  spinner_visible = false;
  selected_format = '';
  video_formats = [{'format_name': "name1", 'format_url': "1111"}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDownloadTypes(this.data.video_id);
  }

  onChange(changeEvent: MatRadioChange) {
    console.warn('-----------radio button changed----------------')
    console.log(changeEvent.value);
    this.selected_format = changeEvent.value;
  }

  getDownloadTypes(video_id: string) {

    let formData = new FormData();
    formData.append("youtube_link", video_id.includes("youtube.com") ? video_id
      : "https://www.youtube.com/watch?v=" + video_id);

    this.spinner_visible = true;
    this.http.post<any>('/download_types', formData).subscribe((resp) => {
      console.warn('-----------download_types returned----------------')
      console.warn(resp)
      console.warn('-----------download_types returned----------------')

      this.video_formats = resp
      this.spinner_visible = false;
      this.selected_format = this.video_formats.length > 0 ? this.video_formats[0].format_url : '';
    });
  }

  onDownloadClicked() {
    console.warn('-----------onDownloadClicked----------------')
    console.warn(this.selected_format)

    let formData = new FormData();
    formData.append("download_link", this.selected_format);

    this.http.post<any>('/download', formData).subscribe();
  }
}
