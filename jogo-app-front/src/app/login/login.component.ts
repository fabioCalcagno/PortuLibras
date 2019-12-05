import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../models/User';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Token } from '../models/Token'
import { AuthTokenService } from '../auth-services/header-token/token.service'
import { Retorno } from '../models/Retorno';
import { tap } from 'rxjs/operators';
import { MenuService } from '../menu/services/menu.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*   verificaValidTouched(campo): any {
      return !this.user.get(campo).valid && this.user.get(campo).touched
    } */

  private user: FormGroup;
  private iuser: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private MenuService: MenuService,
    private AuthTokenService: AuthTokenService,

  ) { }
  private erro = {
    status: false,
    msg: ''
  }


  redirecionarCriarConta() {
    this.AuthTokenService.clearAllTokens()
    this.router.navigate(['criarconta'], ).then(sucess => {
      this.loginService.headerOn = true;
    })
  }

  ngOnInit() {
    this.AuthTokenService.clearAllTokens()

    this.erro.status = false;
    this.erro.msg = ''
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

  lembrarSenha() {
    this.router.navigate(['redefinir'])

  }


  onSubmit() {
    this.iuser = this.user.value;
    this.erro.status = false;
    console.log(this.iuser, 'from form')

    this.spinner.show();
    this.loginService.register(this.iuser).pipe(tap((res: Retorno) => {

      if (res.Codigo !== 200) {
        this.erro.status = true;
        this.erro.msg = res.Mensagem;
      }

      let token: any;
      token = res.Token
      token = this.AuthTokenService.decodificadorToken(token)
      this.MenuService.tokenDecoded.Ativo = token.Ativo
      console.log('sera que foi', token)
      this.AuthTokenService.setHeaderToken(res.Token);
      this.AuthTokenService.setLocalStorageToken(res.Token)
      console.log(res)
    }, (error => {
      console.log(error)
    })
    ))
      .subscribe((login: Retorno) => {
        if (login.Codigo === 200) {
          console.log('Mensagem ->  ' + login.Mensagem);
          this.router.navigate(['/menu'], this.MenuService.tokenDecoded.Ativo);
        }

      }, (error => {
        console.log(error, 'error')
        this.spinner.hide();
      })
      )
  }



}
