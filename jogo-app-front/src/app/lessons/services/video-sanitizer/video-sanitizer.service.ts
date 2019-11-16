import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoSanitizerService {

  constructor(private sanitizer : DomSanitizer) { }


   
   videoSanitizer(video){
  return   this.sanitizer.bypassSecurityTrustResourceUrl(video);
   }
}
