import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../../models/User';
 
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private sanitizer : DomSanitizer, private http : HttpClient) { }

  url = 'http://localhost:5000/api/jogo/NovoJogo';

  private  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
   
   videoSanitizer(video){
  return   this.sanitizer.bypassSecurityTrustResourceUrl(video);
   }

   jogarJogo(user:IUser){
     console.log('user req' , user)
     
     return this.http.post(this.url, user, {headers: this.headers})
   }
}
