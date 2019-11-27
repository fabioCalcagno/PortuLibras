import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../models/User';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Token } from '../models/Token'
import { AuthTokenService } from '../auth-services/header-token/token.service'
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
  private iuser:IUser;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private AuthTokenService:AuthTokenService,
    
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
    this.iuser = this.user.value;
    this.erro.status = false;
    console.log(this.iuser , 'from form' )
   this.loginService.register(this.iuser).subscribe((login : Retorno) => {
     
      if(login.Codigo == 200) {
      
      this.AuthTokenService.setHeaderToken(login.Token);
     this.AuthTokenService.setLocalStorageToken(login.Token)
     let a = this.AuthTokenService.getLocaStorageToken()
     console.log('aaaa', a)
     
      
        
        console.log( 'ok deu certo cod usuario -> '  +  'Mensagem ->  ' + login.Mensagem  );
       this.router.navigate(['/menu']); }
      else console.log(login.Mensagem , 'deu error')
   })
 
  }
    





}
