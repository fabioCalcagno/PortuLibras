import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  private url:string = 'http://localhost:5000/api/login/Acessar'  // ver se qual é a url usada na api e se o processo é o post mesmo


 
    private  headers= new HttpHeaders({
      'Content-Type': 'application/json'
    })
    

  register(user){
    
     return this.http.post(this.url, [user.username, user.password], {headers: this.headers});
  }




}
