import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../models/User';
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: FormGroup;
  private iuser = new User();
  private erro = {
    status: false,
    msg: '',
  }



  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router

  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]
      ],
      password: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        ]
      ],
      rePassword: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        ]
      ],
      email: ['',
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
    if (!user.controls['username'].valid) {
      console.log(user)
      if (user.controls['username'].errors['required']) {
        this.erro.msg = "usuário é requerido";
        return false;
      }
      else if (user.controls['username'].errors['minlength']) {
        this.erro.msg = "tamanho minino de usuário são 3 letras";
        return false;
      }
      else if (user.controls['username'].errors['maxlength']) {
        this.erro.msg = "tamanho maximo de usuario são 20 letras";
        return false;
      }
    }
    if (!user.controls['email'].valid) {
      if (user.controls['email'].errors['required']) {
        this.erro.msg = "email é requerido";
        return false;
      }
      else if (user.controls['email'].errors['email']) {
        this.erro.msg = "formatação de email incompátivel";
        return false;
      }
    }
    if (!user.controls['password'].valid) {
      if (user.controls['password'].errors['required']) {
        this.erro.msg = "senha é requerido";
        return false;
      }
      else if (user.controls['password'].errors['minlength']) {
        this.erro.msg = "tamanho minino de senha são 3 letras";
        console.log(user.controls['password'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['password'].errors['maxlength']) {
        this.erro.msg = "tamanho maximo de senha é de 12 letras";

        return false;
      }
    }
    if (!user.controls['termo'].valid) {
      this.erro.msg = "é nescessario aceitar o termo de uso"
      return false;
    }
   
    else if (!(user.controls['password'].value == user.controls['rePassword'].value)) {
      console.log('senha ' + user.controls['password'].value)
      console.log('REEEsenha ' + user.controls['rePassword'].value)
      this.erro.msg = "confirmação de senha não esta compativel com senha"
      return false;
    }
  

    else return true;
  }



  onSubmit(user) {

    console.log(user)
    console.log(this.erro)

    this.iuser = this.user.value;
    this.loginService.register(this.iuser).subscribe((signin) => {
      if (signin) {
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
