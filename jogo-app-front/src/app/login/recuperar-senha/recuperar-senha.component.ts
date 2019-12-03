import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeaderService } from '../../header/services/header.service';
import { HeaderComponent } from '../../header/header.component'
import { CriarContaService } from './service/criar-conta.service';
import { Retorno } from '../../models/Retorno';
import { ModalService } from '../../modal/Services/modal.service';
import { EmailPlusCodigo } from '../../models/EmailPlusCodigo'
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private router: Router,
    private modalService: ModalService,
    private CriarContaService: CriarContaService,
    

  ) { }

  private Email: FormGroup;
  private codigoReset: FormGroup;
   EmailPlusCodigo:EmailPlusCodigo


  


  confirmacaoEmail = true;

  confirmaEmail() {
    this.confirmacaoEmail = false;

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
    localStorage.setItem('Email', email)
    this.CriarContaService.recuperarSenha(email).subscribe((subscribe: Retorno) => {
      if (subscribe.Codigo == 200) {
        this.modalService.modalRecuperacaoConta();
        this.confirmacaoEmail = false;
      }
    })
  }

  reenviaTokenEmail(email) {

  }


  enviaCodigo() {
   
    let Email = localStorage.getItem('Email')
    let CodigoReset =  this.codigoReset.controls['CodigoReset'].value
    console.log(CodigoReset, 'aaaaaaaaaaaaaaaaaa')
    let body = {
      Email,
      CodigoReset
    }
   
    this.CriarContaService.enviarCodigoConfirmacaoEmail(body)
       .subscribe((subscribe: Retorno) => {

        if (subscribe.Codigo == 200) {
          this.router.navigate(['redefinirsenha'])
        }
        else console.log(subscribe.Mensagem)
      })

  } 



}

