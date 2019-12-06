import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeaderService } from '../../header/services/header.service';
import { HeaderComponent } from '../../header/header.component'
import { CriarContaService } from './service/criar-conta.service';
import { Retorno } from '../../models/Retorno';
import { ModalService } from '../../modal/Services/modal.service';
import { EmailPlusCodigo } from '../../models/EmailPlusCodigo'
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { MenuService } from '../../menu/services/menu.service';
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: ModalService,
    private AuthTokenService:AuthTokenService,
    private MenuService:MenuService,
    private CriarContaService: CriarContaService,
    

  ) { }

  private Email: FormGroup;
  private codigoReset: FormGroup;
   EmailPlusCodigo:EmailPlusCodigo;

   private erro = {
    status: false,
    msg: ''
  }


  


  confirmacaoEmail = true;

  confirmaEmail() {
    this.confirmacaoEmail = false;

  }


  criarConta(){
    this.modalService.modalSairdaTela()
  }

  reenviaTokenEmail() {
    let email = localStorage.getItem('Email:')
    console.log(email, 'reenvio de email')
    this.CriarContaService.recuperarSenha(email).subscribe((subscribe:Retorno)=>{
      if (subscribe.Codigo == 200) {
        this.modalService.modalRecuperacaoConta();
      }
    })
  }





  ngOnInit() {
    this.confirmacaoEmail = true;
    this.Email = this.formBuilder.group({
      Email: [null,
        [
          Validators.required,

        ]
      ],
    })

    this.codigoReset = this.formBuilder.group({
      CodigoReset: [null,
        [
          Validators.required,
        ]
      ]
    })

    

  }

  onSubmit() {

   

    console.log(this.Email.value)
    let email = this.Email.controls['Email'].value;
    localStorage.setItem('Email:', email)
    this.spinner.show()
    this.CriarContaService.recuperarSenha(email).subscribe((subscribe: Retorno) => {
      if(subscribe){
        this.spinner.hide()
      }
      if(subscribe.Codigo !== 200){
        this.erro.status = true;
        this.erro.msg = subscribe.Mensagem;
        
      }
     
     
      if (subscribe.Codigo == 200) {
        this.modalService.modalRecuperacaoConta();
        this.confirmacaoEmail = false;
      }
    }, (error =>{
      console.log(error.message)
      this.spinner.hide();
    }))
  }

 

  enviaCodigo() {
   
    let Email = localStorage.getItem('Email:')
    let CodigoReset =  this.codigoReset.controls['CodigoReset'].value
    console.log(CodigoReset, 'aaaaaaaaaaaaaaaaaa')
    let body = {
      Email,
      CodigoReset
    }
    this.spinner.show()
    this.CriarContaService.enviarCodigoConfirmacaoEmail(body)
                          .pipe(tap((res: Retorno) => {
      
        if(res){
          this.spinner.hide()
        }
      let token: any;
      token = res.Token
      token = this.AuthTokenService.decodificadorToken(token)
      this.MenuService.tokenDecoded.Ativo = token.Ativo
      this.CriarContaService.CodigoUsuario = token.CodigoUsuario
      console.log('testando', token)
      this.AuthTokenService.setHeaderToken(res.Token);
      this.AuthTokenService.setLocalStorageToken(res.Token)
      console.log(res)
    },(error =>{
      this.spinner.hide()
      console.log(error.message)
    })
  ))
       .subscribe((subscribe: Retorno) => {

        if (subscribe.Codigo == 200) {
          this.router.navigate(['redefinirsenha'])
        }
        else console.log(subscribe.Mensagem)
      },(error =>{
        this.spinner.hide()
        console.log(error.message)
      })
    )

  } 



}

