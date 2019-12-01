import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { ExcluirService } from './service/excluir.service';
import { Token } from '../models/Token';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { Retorno } from '../models/Retorno';
import { IUser } from '../models/User';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.component.html',
  styleUrls: ['./editar-conta.component.css']
})
export class EditarContaComponent implements OnInit {

  constructor(private headerService:HeaderService, 
              private ExcluirService:ExcluirService,
              private AuthTokenService:AuthTokenService) {
      this.headerService.opcaoVoltar = true;
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

   token:Token;
   User:IUser;

  ngOnInit() {
  
   
 
  
  }

  excluirConta(){
    this.ExcluirService.excluirConta(this.User).subscribe((subscribe:Retorno)=>{
      if(subscribe.Codigo == 200){
        console.log(subscribe.Mensagem)
      }
      else console.log(subscribe.Mensagem, 'req')
    })
  }

 

}
