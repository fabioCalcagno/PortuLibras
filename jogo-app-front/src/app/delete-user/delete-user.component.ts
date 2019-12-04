import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../modal/Services/modal.service';
import { ExcluirService } from '../editar-conta/service/excluir.service';
import { IUser } from '../models/User';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { Retorno } from '../models/Retorno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private ExcluirService:ExcluirService,
              private route:Router,
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

  ngOnInit() {

    this.senha = this.formBuilder.group({
     
    
      Senha: ['',
      [Validators.required,
    /*   Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*') */
      ]
    ],
  })

  console.log(this.User.CodigoUsuario, 'codigo usuario')
  this.User.Senha = this.senha.controls['Senha'].value;
  
}




 excluirConta(){   
  this.confirmacaoExclusao=false;
  console.log('USERR', this.User)
    this.ExcluirService.excluirConta(this.User).subscribe((subscribe:Retorno)=>{
       if(subscribe.Codigo == 200){
         this.ModalService.modalConfirmaContaExcluida()
         console.log(subscribe.Mensagem)
         this.AuthTokenService.clearAllTokens()
         this.route.navigate(['menu'])
         location.reload()
       }
       else console.log(subscribe.Mensagem, 'req')
     }) 
   }


   confirmaExclusao(boleano){
    return this.confirmacaoExclusao = boleano;
   }




  } 
 


 






