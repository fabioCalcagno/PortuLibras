import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  private url:string = 'http://localhost:3003'  // ver se qual é a url usada na api e se o processo é o post mesmo


  register(user:User){
    return this.http.post(this.url, user)
  }




}
