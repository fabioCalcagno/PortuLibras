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
      Username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]
      ],
      Senha: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        ]
      ],
      reSenha: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
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
    if (!user.controls['Username'].valid) {
      console.log(user)
      if (user.controls['Username'].errors['required']) {
        this.erro.msg = "usuário é requerido";
        return false;
      }
      else if (user.controls['Username'].errors['minlength']) {
        this.erro.msg = "tamanho minino de usuário são 3 letras";
        return false;
      }
      else if (user.controls['Username'].errors['maxlength']) {
        this.erro.msg = "tamanho maximo de usuario são 20 letras";
        return false;
      }
    }
    if (!user.controls['Email'].valid) {
      if (user.controls['Email'].errors['required']) {
        this.erro.msg = "Email é requerido";
        return false;
      }
      else if (user.controls['Email'].errors['email']) {
        this.erro.msg = "formatação de Email incompátivel";
        return false;
      }
    }
    if (!user.controls['Senha'].valid) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "senha é requerido";
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "tamanho minino de senha são 3 letras";
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "tamanho maximo de senha é de 12 letras";

        return false;
      }
    }
    if (!user.controls['termo'].valid) {
      this.erro.msg = "é nescessario aceitar o termo de uso"
      return false;
    }
   
    else if (!(user.controls['Senha'].value == user.controls['reSenha'].value)) {
      console.log('senha ' + user.controls['Senha'].value)
      console.log('REEEsenha ' + user.controls['reSenha'].value)
      this.erro.msg = "confirmação de senha não esta compativel com senha"
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
      if (signin) {
        console.log(signin.Codigo + " " + signin.Mensagem + " " + signin.Data)
        this.router.navigate(['/lessons'])
      }
      else this.user.reset() 
    },
      (error: any) => {
        console.log(error.error)

      }
    )
  }


}
