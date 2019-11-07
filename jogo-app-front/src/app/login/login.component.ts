import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Retorno } from '../models/Retorno';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  verificaValidTouched(campo): any {
    return !this.user.get(campo).valid && this.user.get(campo).touched
  }

  private user: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
   
   

  ) { }
  private erro = {
    status: false,
    msg: ''
  }


 
  ngOnInit() {
    this.erro.status = false;
    this.erro.msg= ''
    this.user = this.formBuilder.group({

      Username: [null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          ]
      ],
      Senha: [null,
        Validators.required
      ],
     
      

    })

  }  

  


  onSubmit() {

    this.erro.status = false;
    console.log(this.user)
   this.loginService.register(this.user).subscribe((login : Retorno) => {
      if(login.Codigo == 200) {
        console.log( 'ok deu certo' + login.Codigo +  'ou login ' + login );
       this.router.navigate(['/menu']); }
      else console.log(login.Mensagem , 'deu error')
   })
 
  }
    





}
