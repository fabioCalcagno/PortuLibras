import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Retorno } from '../../../../models/Retorno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrarUsuarioService {

  constructor( private http: HttpClient) { }

  private url:string = 'http://localhost:5000/api/login/CadastrarUsuario'  // ver se qual é a url usada na api e se o processo é o post mesmo


 
    private  headers= new HttpHeaders({
      'Content-Type': 'application/json'
    })
    

  criarConta(user){  // tem que mandar como json nesta vao todos os dados do user
    console.log(user , 'cadstrar service')
     return  this.http.post(this.url, user, {headers: this.headers}) 
  }

}
