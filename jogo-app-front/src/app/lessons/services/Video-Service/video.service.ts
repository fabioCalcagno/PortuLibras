import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../../models/User';
import { of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private sanitizer : DomSanitizer, private http : HttpClient) { }

  url = 'http://localhost:5000/api/jogo/NovoJogo';

  private  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  mock = {"Data":"{\"Partida\":[{\"CodigoJogo\":227,\"NumeroRodada\":1,\"Diretorio\":\"../../assets/videos/20.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"ENTENDER\"},{\"CodigoAcerto\":0,\"Palavra\":\"ARROZ\"},{\"CodigoAcerto\":0,\"Palavra\":\"ACUSAR\"},{\"CodigoAcerto\":1,\"Palavra\":\"EL@ AMANHÃ CASAR\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":2,\"Diretorio\":\"../../assets/videos/26.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"NÓS VENDER 12 BANANA+\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ VIAJAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"ALEGRE\"},{\"CodigoAcerto\":1,\"Palavra\":\"EL@ FEI@\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":3,\"Diretorio\":\"../../assets/videos/14.mp4\",\"Palavras\":[{\"CodigoAcerto\":1,\"Palavra\":\"MEDO\"},{\"CodigoAcerto\":0,\"Palavra\":\"ARROZ\"},{\"CodigoAcerto\":0,\"Palavra\":\"ÓDIO\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ FALAR POUCO\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":4,\"Diretorio\":\"../../assets/videos/29.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"EL@ VIAJAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"EU CASA MINH@\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ AMANHÃ CASAR\"},{\"CodigoAcerto\":1,\"Palavra\":\"EL@ FALAR POUCO\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":5,\"Diretorio\":\"../../assets/videos/16.mp4\",\"Palavras\":[{\"CodigoAcerto\":1,\"Palavra\":\"ÓDIO\"},{\"CodigoAcerto\":0,\"Palavra\":\"HOMEM ALT@\"},{\"CodigoAcerto\":0,\"Palavra\":\"ELA COMER MUITO\"},{\"CodigoAcerto\":0,\"Palavra\":\"OI. TUD@ BEM?\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":6,\"Diretorio\":\"../../assets/videos/18.mp4\",\"Palavras\":[{\"CodigoAcerto\":1,\"Palavra\":\"EL@ VIAJAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"PERGUNTAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"PEIXE\"},{\"CodigoAcerto\":0,\"Palavra\":\"APRENDER\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":7,\"Diretorio\":\"../../assets/videos/31.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"EL@ VIAJAR\"},{\"CodigoAcerto\":1,\"Palavra\":\"EL@ NÓS GOSTAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"OBRIGAD@\"},{\"CodigoAcerto\":0,\"Palavra\":\"CADERNO\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":8,\"Diretorio\":\"../../assets/videos/2.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"MORANGO\"},{\"CodigoAcerto\":1,\"Palavra\":\"PERGUNTAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"APRENDER\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ AMANHÃ CASAR\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":9,\"Diretorio\":\"../../assets/videos/12.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"MEDO\"},{\"CodigoAcerto\":0,\"Palavra\":\"APRENDER\"},{\"CodigoAcerto\":1,\"Palavra\":\"PEIXE\"},{\"CodigoAcerto\":0,\"Palavra\":\"EU CASA MINH@\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":10,\"Diretorio\":\"../../assets/videos/13.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"NÓS VENDER 12 BANANA+\"},{\"CodigoAcerto\":0,\"Palavra\":\"ENTENDER\"},{\"CodigoAcerto\":0,\"Palavra\":\"OI. TUD@ BEM?\"},{\"CodigoAcerto\":1,\"Palavra\":\"ELEFANTE\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":11,\"Diretorio\":\"../../assets/videos/9.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"AQUELA MULHER BAIX@\"},{\"CodigoAcerto\":1,\"Palavra\":\"ARROZ\"},{\"CodigoAcerto\":0,\"Palavra\":\"PEIXE\"},{\"CodigoAcerto\":0,\"Palavra\":\"OBRIGAD@\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":12,\"Diretorio\":\"../../assets/videos/5.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"EL@ FEI@\"},{\"CodigoAcerto\":0,\"Palavra\":\"OBRIGAD@\"},{\"CodigoAcerto\":0,\"Palavra\":\"EU CASA MINH@\"},{\"CodigoAcerto\":1,\"Palavra\":\"ACUSAR\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":13,\"Diretorio\":\"../../assets/videos/27.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"EL@ AMANHÃ CASAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"ARROZ\"},{\"CodigoAcerto\":1,\"Palavra\":\"AQUELA MULHER BAIX@\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ VIAJAR\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":14,\"Diretorio\":\"../../assets/videos/6.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"MESA\"},{\"CodigoAcerto\":1,\"Palavra\":\"APRENDER\"},{\"CodigoAcerto\":0,\"Palavra\":\"HOMEM ALT@\"},{\"CodigoAcerto\":0,\"Palavra\":\"EL@ VIAJAR\"}]},{\"CodigoJogo\":227,\"NumeroRodada\":15,\"Diretorio\":\"../../assets/videos/17.mp4\",\"Palavras\":[{\"CodigoAcerto\":0,\"Palavra\":\"CHAMAR\"},{\"CodigoAcerto\":0,\"Palavra\":\"OBRIGAD@\"},{\"CodigoAcerto\":0,\"Palavra\":\"MORANGO\"},{\"CodigoAcerto\":1,\"Palavra\":\"OI. TUD@ BEM?\"}]}]}","Codigo":200,"Mensagem":"Partida gerada com sucesso!","Token":"FALTA"};
  
   
   videoSanitizer(video){
  return   this.sanitizer.bypassSecurityTrustResourceUrl(video);
   }

   jogarJogo(user:IUser){
     console.log('user req' , user)
     return of(this.mock);
    //  return this.http.post(this.url, user, {headers: this.headers})
   }
}
