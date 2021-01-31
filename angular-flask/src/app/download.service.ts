import {Injectable, Inject} from '@angular/core'
import {HttpClient, HttpRequest} from '@angular/common/http'
import {download, Download} from './download'
import {map, switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {SAVER, Saver} from './saver.provider'

@Injectable({providedIn: 'root'})
export class DownloadService {

  constructor(
    private http: HttpClient,
    @Inject(SAVER) private save: Saver
  ) {
  }

  download(url: string, filename: string): Observable<Download> {
    let formData = new FormData();
    formData.append("download_link", url);

    return this.http
      .post <string>('/generate_key', formData)
      .pipe(switchMap(respId => this.downloadByKey(respId.toString(), filename)));
  }

  private downloadByKey(download_key: string, filename: string) {
    const option = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    };

    // @ts-ignore
    return this.http.get('/download_by_key?download_key='.concat(download_key), option).pipe(download(blob => this.save(blob, filename)));
  }

  blob(url: string, filename?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}
