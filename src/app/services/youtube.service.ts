import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youTubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  //private apiKey: string = 'AAIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken: string = '';

  constructor( public http: HttpClient ) { }

  getVideos() {

    let url = `${ this.youTubeUrl }/playlistItems`;
    let params = new HttpParams();
 
    params = params.append('part', 'snippet' );
    params = params.append('maxResults', '10' );
    params = params.append('playlistId', this.playlist );
    //params = params.append('key', this.apiKey );

    if ( this.nextPageToken ) {
      params = params.append('pageToken', this.nextPageToken );
    }
 
    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log(res);
      this.nextPageToken = res.nextPageToken;
      let videos: any[] = [];
      for ( let video of res.items ) {
        let snippet = video.snippet;
        videos.push( snippet );
      }
      return videos;
    }) );

  }
}
