import { Injectable, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode'; 
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../../models/Token'
import { IUser } from '../../models/User';





@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {


  constructor(   ) {   }
  
  private headers = new HttpHeaders();
  httpOptions;
   
  setHeaderToken(token){
    this.httpOptions = {
      headers:  ({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
       
      })
    }
    window.localStorage.setItem('authToken', `${token}`);
    console.log(this.getHeaderToken())
  }

  

getHeaderToken(){
 return this.httpOptions = {
    headers:  ({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + `${this.getLocalStorageToken()}`,
     
    })
  }
}


/*     preencheUserComToken(user:IUser){
      let token:Token;
      token = this.showDecodedJwt()
      user = {
      CodigoJogo = null,
      CodigoUsuario = token.CodigoUsuario,
      Email = token.Email;
      Nome = token.Nome;
      Score = null;
      Senha = null;
      Sobrenome = token.Sobrenome;
      Username = token.Username;
      }
      console.log('preencheUserComToken' , user)
      return user;
     
    } */



   setLocalStorageToken(token: any){
    return window.localStorage.setItem('authToken', token);
   }
 
   getLocalStorageToken(){ 
      return window.localStorage.getItem('authToken');
   }

   showDecodedJwt(){
     try{
    const token = jwt_decode(this.getLocalStorageToken()) as Token;
    console.log(token.CodigoUsuario, 'showDecodedJwt')
    return token;
     }catch (Error){
       console.log(Error.message)
       return Error.message
     }
    
   }

   hasHeaderToken(){
     console.log(this.headers.has('Authorization'))
    return  this.headers.has('Authorization');
     
   }


   
  


  
  
}
