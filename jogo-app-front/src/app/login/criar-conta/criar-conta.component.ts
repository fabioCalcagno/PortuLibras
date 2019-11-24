import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from '../../models/User';
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { CadastrarUsuarioService } from './services/cadastro/cadastrar-usuario.service'
import { Retorno } from '../../models/Retorno';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: FormGroup;
  private iuser : IUser
  private erro = {
    status: false,
    msg: '',
  }



  constructor(
    private formBuilder: FormBuilder,
    private cadastrarUsuarioService: CadastrarUsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      Nome: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]
      ],
      Sobrenome: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]
      ],
      Username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]
      ],
      Senha: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        ]
      ],
      reSenha: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        ]
      ],
      Email: ['',
        [Validators.required,
        Validators.email
        ]
      ],
      termo: [false,
        [Validators.pattern('true'),
        ]
      ]
    })
  }

  campoValidate(user: FormGroup) {
    this.erro.msg = '';
    if (!user.controls['Nome'].valid) {
      console.log(user)
      if (user.controls['Nome'].errors['required']) {
        this.erro.msg = "Preencher campo nome";
        return false;
      }
      else if (user.controls['Nome'].errors['minlength']) {
        this.erro.msg = "Preencher nome igual exemplo (Rui)";
        return false;
      }
      else if (user.controls['Nome'].errors['maxlength']) {
        this.erro.msg = "Preencher nome igual exemplo (Rui)";
        return false;
      }
    }
    if (!user.controls['Sobrenome'].valid) {
      console.log(user)
      if (user.controls['Sobrenome'].errors['required']) {
        this.erro.msg = "Preencher campo sobrenome";
        return false;
      }
      else if (user.controls['Sobrenome'].errors['minlength']) {
        this.erro.msg = "Preencher sobrenome igual exemplo (Eu)";
        return false;
      }
      else if (user.controls['Sobrenome'].errors['maxlength']) {
        this.erro.msg = "Preencher sobrenome igual exemplo (Eu)";
        return false;
      }
    }
    if (!user.controls['Username'].valid) {
      console.log(user)
      if (user.controls['Username'].errors['required']) {
        this.erro.msg = "Preencher campo usuário";
        return false;
      }
      else if (user.controls['Username'].errors['minlength']) {
        this.erro.msg = "Preencher usuário igual exemplo (Eu123456)";
        return false;
      }
      else if (user.controls['Username'].errors['maxlength']) {
        this.erro.msg = "Preencher usuário igual exemplo (Eu123456)";
        return false;
      }
    }
    if (!user.controls['Email'].valid) {
      if (user.controls['Email'].errors['required']) {
        this.erro.msg = "Preencher campo e-mail";
        return false;
      }
      else if (user.controls['Email'].errors['email']) {
        this.erro.msg = "Preencher com e-mail válido";
        return false;
      }
    }
    if (!user.controls['Senha'].valid) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "Preencher campo senha)";
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "Preencher senha igual exemplo (Senha123)";
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "Preencher senha igual exemplo (Senha123)";

        return false;
      }
    }
    if (!user.controls['termo'].valid) {
      this.erro.msg = "Aceitar Termos de Uso"
      return false;
    }
   
    else if (!(user.controls['Senha'].value == user.controls['reSenha'].value)) {
      console.log('senha ' + user.controls['Senha'].value)
      console.log('REEEsenha ' + user.controls['reSenha'].value)
      this.erro.msg = "Senha combinar não"
      return false;
    }
  

    else return true;
  }



  onSubmit(user) {

    console.log(user)
    console.log(this.erro)

    this.iuser = this.user.value;
    console.log(this.iuser , 'aaaaa')
    this.cadastrarUsuarioService.criarConta(this.iuser).subscribe((signin :Retorno) => {
      if (signin.Codigo == 200) {
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
