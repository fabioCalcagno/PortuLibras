import { Injectable, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode'; 
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Token } from '../../models/Token'
import { IUser } from '../../models/User';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';






@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {


  constructor( private router:Router  ) {   }
  
  private headers = new HttpHeaders();
  httpOptions;
  private userSubject$ = new BehaviorSubject<Token>(null)
   
  setHeaderToken(token){
    this.httpOptions = {
      headers:  ({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
       
      })
    }
    window.localStorage.setItem('authToken', `${token}`);
    console.log( 'token->',  this.getHeaderToken())
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


    clearAllTokens(){
      localStorage.clear()
    }



   setLocalStorageToken(token: any){
    return window.localStorage.setItem('authToken', token);
   }
 
   getLocalStorageToken(){ 
      return window.localStorage.getItem('authToken');
   }

   showDecodedJwt(){
     try{
    const token = jwt_decode(this.getLocalStorageToken()) as Token;
    this.userSubject$.next(token)
    console.log(token.CodigoUsuario, 'showDecodedJwt')
    return token;
     }catch (Error){
       console.log(Error.message)
        return this.router.navigate(['menu']) 
     }
    
   }


   decodificadorToken(token){
    let x = jwt_decode(token) as Token;
    return x;
   }

   hasHeaderToken(){
     console.log(this.headers.has('Authorization'))
    return  this.headers.has('Authorization');
     
   }


   
  


  
  
}
