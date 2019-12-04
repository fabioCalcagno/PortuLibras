import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { ExcluirService } from './service/excluir.service';
import { Token } from '../models/Token';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { Retorno } from '../models/Retorno';
import { IUser } from '../models/User';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValidationFormService } from '../validationForm-service/validation.service';
import { ModalService } from '../modal/Services/modal.service';
import { LoginService } from '../login/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.component.html',
  styleUrls: ['./editar-conta.component.css']
})
export class EditarContaComponent implements OnInit {

  constructor(private headerService:HeaderService, 
              private ExcluirService:ExcluirService,
              private formBuilder:FormBuilder,
              private modalService: ModalService,
              private router:Router,
              private LoginService:LoginService,
              private ValidationFormService:ValidationFormService,
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

   token:any;
   User:IUser;
   user:FormGroup;

   erro = {
     msg: '',
     status: false
   }

  ngOnInit() {

   
    this.user = this.formBuilder.group({
     
      Username: [this.User.Username,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z0-9]*'),
        
        ]
      ],
      SenhaAntiga: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
       
        ]
      ],
      Senha: ['',
      [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*')
     
      ]
    ],

      reSenha: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z0-9]*')
        ]
      ],
      Email: [this.User.Email],
     
    })

   this.ValidationFormService.campoValidate(this.user)
    
  }
 
  
  

  excluirConta(){
  this.router.navigate(['menu/delete'])
  }


  atualizarUsuario(){
    console.log(this.ValidationFormService.validacaoEditarUsuario(this.user), 'tem que ser true pra enviar')
 
    if(this.ValidationFormService.validacaoEditarUsuario(this.user)){
      this.User.Username = this.user.controls['Username'].value
      this.User.Senha = this.user.controls['Senha'].value
      console.log(this.User, 'tem que estar preenchido');

      let body = {
        Username: this.token.Username,
        Senha: this.user.controls['SenhaAntiga'].value
      }

      this.LoginService.register(body).subscribe((subscribe:Retorno)=>{
        if(subscribe.Codigo == 200){ 

      this.ExcluirService.editarConta(this.User).subscribe((subscribe:Retorno)=>{
        if(subscribe.Codigo == 200){
          console.log(subscribe.Mensagem)
          this.modalService.modalTrocaUsuarioSenhaOK()
          this.router.navigate(['menu'])
        } 
      })
    }else {
      console.log('msg->' , this.ValidationFormService.erro.msg)
      this.ValidationFormService.erro.status = false;
      this.ValidationFormService.erro.msg = "Editar Usuario não ok"
    }

  })

  }



    


}

}
