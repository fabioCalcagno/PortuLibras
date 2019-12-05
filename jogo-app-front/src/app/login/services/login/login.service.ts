import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000/api/login/Acessar';  // ver se qual é a url usada na api e se o processo é o post mesmo

  headerOn: boolean;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  register(user) {
    console.log(user, 'user requisicao');
    return this.http.post(this.url, user, { headers: this.headers });

  }

  confirmarEmail(email: string) {
    return this.http.get('http://localhost:5000/api/Login/ConfirmaConta?email=' + email, { headers: this.headers });
  }

}
