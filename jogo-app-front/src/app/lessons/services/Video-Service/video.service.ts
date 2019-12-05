import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../../models/User';
import { ModalService } from '../../../modal/Services/modal.service';
import { AuthTokenService } from '../../../auth-services/header-token/token.service'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private sanitizer: DomSanitizer,
    private http: HttpClient,
    private AuthTokenService: AuthTokenService,
    private modalService: ModalService
  ) { }

  url = 'http://localhost:5000/api/jogo/NovoJogo';
  urlPontos = 'http://localhost:5000/api/jogo/RegistrarPontos'

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.AuthTokenService.getLocalStorageToken()
  })




  videoSanitizer(video) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }



  jogarJogo(user: IUser) {
    console.log('user req', user)
    // return of(this.mock);
    return this.http.post(this.url, user, { headers: this.headers })
  }


  salvarPontuacao(user: IUser) {
    console.log(user)
    return this.http.post(this.urlPontos, user, { headers: this.headers })
  }



}
