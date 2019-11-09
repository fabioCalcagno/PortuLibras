import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private httpClient: HttpClient) { }

  private  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });

    private commomUrl = 'http://localhost:5000/api/pontos/';

   

    
    

      
    registrarPontuacao(iScore){
         return this.httpClient.post(this.commomUrl + 'RegistrarPontos',
                                      iScore.CodigoUsuario + iScore.Pontos,
                                       {headers: this.headers});
      }

      buscarPontuacaoUsuario(iScore){
        return this.httpClient.get(this.commomUrl + 'ListaJogos?' + iScore.CodigoUsuario, 
                                     {headers: this.headers} );
      }

}
