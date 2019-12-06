import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IUser } from '../../models/User';
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

import { CadastrarUsuarioService } from './services/cadastro/cadastrar-usuario.service'
import { Retorno } from '../../models/Retorno';
import { HeaderService } from '../../header/services/header.service';
import { ValidationFormService } from '../../validationForm-service/validation.service';
import { ModalService } from '../../modal/Services/modal.service';
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { ExcluirService } from '../../editar-conta/service/excluir.service';



@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: FormGroup;
  private userAtualizacao:FormGroup;
  private iUserAtualizacao:IUser;
  private iuser : IUser
  



  constructor(
    private formBuilder: FormBuilder,
    private cadastrarUsuarioService: CadastrarUsuarioService,
    private modalService:ModalService,
    private loginService:LoginService,
    private spinner: NgxSpinnerService,
    private ExcluirService:ExcluirService,
    private headerService:HeaderService,
    private ValidationFormService:ValidationFormService,
    private AuthTokenService:AuthTokenService,
    private router: Router

  ) { 
    this.headerService.opcaoVoltar = true;
    this.headerService.rotaVoltar = "Menu";
  
    
  }





  token:any;
  User:IUser;
  UserAtualizacao:IUser
  erro = {
    status: false,
    msg: '',
  }

  ngOnInit() {
    this.spinner.hide()


    if(this.cadastrarUsuarioService.emailTrocarDepoisDoLogin){
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
      this.userAtualizacao = this.formBuilder.group({
        Nome: [ this.User.Nome ,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z]*')
          ]
        ],
        Sobrenome: [ this.User.Sobrenome ,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z]*')
          ]
        ],
        Username: [ this.User.Username ,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern('[a-zA-Z0-9]*')
          ]
        ],
       
        Email: [ this.User.Email ,
          [Validators.required]
        ],
        Senha: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,20}$') 
       
        ]
      ],
      })
  
    
      
     }

     if(!this.cadastrarUsuarioService.emailTrocarDepoisDoLogin){

    this.user = this.formBuilder.group({
      Nome: [ '' ,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]
      ],
      Sobrenome: ['' ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]
      ],
      Username: [ '' ,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z0-9]*')
        ]
      ],
      Senha: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,20}$') 
       
        ]
      ],
      reSenha: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,20}$') 
        ]
      ],
      Email: [ '' ,
        [Validators.required,
        Validators.email]
      ],
      termo: [false,
        [Validators.pattern('true'),
        ]
      ]
    })

    this.ValidationFormService.campoValidate(this.user)
  
}
  }

    


  

  

  onSubmit(user) {
    console.log(user)
    this.spinner.show();

    this.iuser = this.user.value;
    console.log(this.iuser , 'aaaaa')
    this.cadastrarUsuarioService.criarConta(this.iuser).subscribe((signin :Retorno) => {
      if(signin){
        this.spinner.hide();
      }
      if (signin.Codigo == 200) {
        window.localStorage.setItem('primeiroLogin', "true")
        console.log(signin.Codigo + " " + signin.Mensagem + " " + signin.Data)
        this.router.navigate(['/menu'])
      }
       if(signin.Codigo !== 200) {
        this.ValidationFormService.erro.status = false
        this.ValidationFormService.erro.msg =signin.Mensagem
      }
    },
      (error: any) => {
        console.log(error.error)
        this.spinner.hide();

      }
    )
  }



  atualizarCadastro(userAtualizacao){
    console.log(userAtualizacao, 'maria')
    console.log(this.token.CodigoUsuario, 'maria')
    this.iUserAtualizacao = this.userAtualizacao.value
    this.iUserAtualizacao.CodigoUsuario = this.token.CodigoUsuario
    console.log('jose', this.iUserAtualizacao)

/* 
    this.iUserAtualizacao.Email = this.userAtualizacao.controls['Email']
    this.iUserAtualizacao.CodigoUsuario = this.User.CodigoUsuario */
/* 
    this.UserAtualizacao.Nome = this.user.controls['Nome'].value
    this.UserAtualizacao.Sobrenome = this.user.controls['Sobrenome'].value
    this.User.Username = this.user.controls['Username'].value
    this.User.Email = this.user.controls['Email'].value
    this.User.CodigoUsuario = this.token.CodigoUsuario
 */
    this.ExcluirService.editarConta(this.iUserAtualizacao).subscribe((subscribe:Retorno)=>{
      if(subscribe.Codigo == 200){
        console.log('ATUALIZAR cadastro ok', subscribe.Mensagem )
        this.router.navigate(['menu'])
      }
    })
    
  }


}
