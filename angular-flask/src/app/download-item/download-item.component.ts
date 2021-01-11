import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatRadioChange} from "@angular/material/radio";
import * as fileSaver from 'file-saver';
import {switchMap} from "rxjs/operators";

const youtubePrefix: string = "https://www.youtube.com/watch?v=";

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  spinner_visible = false;
  selected_format = '';

  video_formats: { format_name: string; format_url: string; }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { video_id: string, video_title: string, img_url: string },
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDownloadTypes(this.data.video_id);
  }

  onChange(changeEvent: MatRadioChange) {
    this.selected_format = changeEvent.value;
  }

  getDownloadTypes(video_id: string) {

    let formData = new FormData();
    formData.append("youtube_link", (video_id.includes("youtube.com") ? video_id : youtubePrefix + video_id));

    this.spinner_visible = true;
    this.http.post<any>('/download_types', formData).subscribe((resp) => {
      console.debug('-----------download_types returned----------------')
      console.debug(resp)
      console.debug('-----------download_types returned----------------')

      this.video_formats = resp
      this.spinner_visible = false;
      this.selected_format = this.video_formats.length > 0 ? this.video_formats[0].format_url : '';
    });
  }

  onDownloadClicked() {
    console.debug('-----------onDownloadClicked----------------')
    console.debug(this.selected_format)

    let formData = new FormData();
    formData.append("download_link", this.selected_format);

    this.http
      .post<any>('/generate_key', formData)
      .pipe(switchMap(respId => this.downloadByKey(respId.toString())))
      .subscribe((respFileData: any) => {

        let blob: any = new Blob([respFileData], {type: 'video/mp4; charset=utf-8'});
        fileSaver.saveAs(blob, 'tester.mp4');
      }), (error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  downloadByKey(download_key: string) {
    return this.http.get('/download?download_key=' + download_key, {responseType: 'blob'});
  }
}
