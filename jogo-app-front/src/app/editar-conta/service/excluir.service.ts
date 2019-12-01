import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { Token } from '../../models/Token';
import { IUser } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class ExcluirService   {

  constructor(private http:HttpClient,
              private AuthTokenService:AuthTokenService) { 

             
              }

  url = 'http://localhost:5000/api/Usuario/ExcluirConta'
  

   private  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.AuthTokenService.getLocalStorageToken()
  })


  excluirConta(user:IUser){
    console.log(user, 'codUser')
    return this.http.post(this.url, user  , {headers : this.headers} )
  }
}
