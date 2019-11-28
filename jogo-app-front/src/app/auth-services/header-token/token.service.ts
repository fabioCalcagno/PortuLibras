import { Injectable, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode'; 
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../../models/Token'





@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {


  constructor(   ) { }
  
  private headers = new  HttpHeaders();
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



   setLocalStorageToken(token: any){
    return window.localStorage.setItem('authToken', token);
   }
 
   getLocalStorageToken(){ 
      return window.localStorage.getItem('authToken');
   }

   showDecodedJwt(){
    const token = jwt_decode(this.getLocalStorageToken()) as Token;
    console.log(token.CodigoUsuario, 'showDecodedJwt')
    return token;
   }

   hasHeaderToken(){
     console.log(this.headers.has('Authorization'))
    return  this.headers.has('Authorization');
     
   }


   
  


  
  
}
