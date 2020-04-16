import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor( public yts: YoutubeService ) {
    this.yts.getVideos().subscribe( videos =>  this.videos = videos );
  }

  ngOnInit(): void {
  }

  watchVideo( video: any ) {
    this.videoSel = video;
    $('#myModal').modal();
  }

  loadMore() {
    this.yts.getVideos().subscribe( videos =>  this.videos.push.apply( this.videos, videos) );
  }

  closeModal() {
    this.videoSel = null;
    $('#myModal').modal('hide');
  }

}
