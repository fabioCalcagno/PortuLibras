import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IUser } from '../../models/User';
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { CadastrarUsuarioService } from './services/cadastro/cadastrar-usuario.service'
import { Retorno } from '../../models/Retorno';
import { HeaderService } from '../../header/services/header.service';
import { ValidationFormService } from '../../validationForm-service/validation.service';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: FormGroup;
  private iuser : IUser
  



  constructor(
    private formBuilder: FormBuilder,
    private cadastrarUsuarioService: CadastrarUsuarioService,
    private loginService:LoginService,
    private headerService:HeaderService,
    private ValidationFormService:ValidationFormService,
    private router: Router

  ) { 
    this.headerService.opcaoVoltar = true;
    this.headerService.rotaVoltar = "Menu"
    
  }

  erro = {
    status: false,
    msg: '',
  }

  ngOnInit() {
    this.user = this.formBuilder.group({
      Nome: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*')
        ]
      ],
      Sobrenome: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]
      ],
      Username: ['',
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
      Email: ['',
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

    


  

  

  onSubmit(user) {
    console.log(user)

    this.iuser = this.user.value;
    console.log(this.iuser , 'aaaaa')
    this.cadastrarUsuarioService.criarConta(this.iuser).subscribe((signin :Retorno) => {
      if (signin.Codigo == 200) {
        window.localStorage.setItem('primeiroLogin', "true")
        console.log(signin.Codigo + " " + signin.Mensagem + " " + signin.Data)
        this.router.navigate(['/menu'])
      }
      else this.user.reset() 
    },
      (error: any) => {
        console.log(error.error)

      }
    )
  }


}
