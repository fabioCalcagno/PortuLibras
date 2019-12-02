import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../../../auth-services/header-token/token.service';



@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient,
    private AuthTokenService: AuthTokenService, ) { }


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.AuthTokenService.getLocalStorageToken()
  })

  private url = 'http://localhost:5000/api/Pontos/ListaJogos';


  listaPontuacao(user) {
    console.log(this.headers, 'console')
    return this.http.post(this.url, user,{headers:this.headers} )
  }




}
