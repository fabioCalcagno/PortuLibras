import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../modal/Services/modal.service';
import { ExcluirService } from '../editar-conta/service/excluir.service';
import { IUser } from '../models/User';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { Retorno } from '../models/Retorno';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../login/services/login/login.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private ExcluirService:ExcluirService,
              private route:Router,
              private spinner: NgxSpinnerService,
              private loginService:LoginService,
              private AuthTokenService:AuthTokenService,
              private ModalService:ModalService) { 

        this.token;
        this.token = this.AuthTokenService.showDecodedJwt()
        this.User = {
        Nome: this.token.Nome,
        CodigoUsuario: this.token.CodigoUsuario,
        Sobrenome: this.token.Sobrenome,
        Username: this.token.Username,
        Senha: null,
        Email: this.token.Email,
        Score: null ,
        CodigoJogo:null, 
      } 



              }

  senha:FormGroup
  senhaReq:any;
  User:IUser
  token:any;
  confirmacaoExclusao:boolean;
  private erro = {
    msg: '',
    status:false
  }

  ngOnInit() {
     this.spinner.hide()
    this.senha = this.formBuilder.group({
     
    
      Senha: ['',
      [Validators.required,
       Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,20}$') 
      ]
    ],
  })

  console.log(this.User.CodigoUsuario, 'codigo usuario')
  this.User.Senha = this.senha.controls['Senha'].value;
  
}




 excluirConta(){  
   console.log(this.senha, 'fer')
  this.User.Senha = this.senha.controls['Senha'].value; 
  this.confirmacaoExclusao=false;
  console.log('USERR', this.User.Senha)


  this.spinner.show();
this.loginService.register(this.User).subscribe((subscribe:Retorno)=>{
  if(subscribe.Codigo == 200){

    this.ExcluirService.excluirConta(this.User).subscribe((subscribe:Retorno)=>{
      if(subscribe){
        this.spinner.hide();
      }
       if(subscribe.Codigo == 200){
         this.ModalService.modalConfirmaContaExcluida()
         console.log(subscribe.Mensagem)
         this.AuthTokenService.clearAllTokens()
         this.route.navigate(['menu'])
         location.reload()
       }
       else console.log(subscribe.Mensagem, 'req')
     },(error =>{
       this.erro.status = true;
       this.erro.msg = 'Senha combinar não';
       this.spinner.hide()
     })) 
   }else{
     this.spinner.hide()
    this.erro.status = true;
    this.erro.msg = subscribe.Mensagem
   }

  })




}
 
 
    


   confirmaExclusao(boleano){
    return this.confirmacaoExclusao = boleano;
   }




  } 
 


 






