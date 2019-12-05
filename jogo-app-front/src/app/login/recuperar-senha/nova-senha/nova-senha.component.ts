import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderService } from '../../../header/services/header.service';
import { CriarContaService } from '../service/criar-conta.service';
import { Retorno } from '../../../models/Retorno';
import { ModalService } from '../../../modal/Services/modal.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ValidationFormService } from '../../../validationForm-service/validation.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private HeaderService:HeaderService, 
              private ModalService:ModalService,
              private router:Router,
              private spinner: NgxSpinnerService,
              private ValidationFormService:ValidationFormService,
              private CriarContaService:CriarContaService) { 

   
    

  }
  senhaNova:FormGroup;

  Senha:any;
  reSenha:any;
  

  private erro = {
    msg: '',
    status:false
  }





  verificaSenhasIguais(){
    
  }

  ngOnInit() {

    console.log(this.CriarContaService.CodigoUsuario, 'ver se esta aqui')

    this.senhaNova = this.formBuilder.group({

      Senha: ['',
      [Validators.required,
       Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,12}$') 
      ]
    ],
      reSenha:['',
      [Validators.required,
       Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{8,12}$') 
      ]
    ],
    })

    console.log(this.senhaNova)
    this.ValidationFormService.novaSenhaCampoValidate(this.senhaNova)
    
    
  }


  onSubmit(senha){
    let validacao = this.ValidationFormService.novaSenhaCampoValidate(this.senhaNova)
    console.log(senha.value, 'senhassssssssssssss')
    this.Senha = this.senhaNova.controls['Senha'].value;
    this.reSenha = this.senhaNova.controls['reSenha'].value;
    console.log(this.Senha , this.reSenha, 'isssoooososoo')

    console.log(validacao,'validacao')


        let body = {
          Senha: this.Senha,
          CodigoUsuario: this.CriarContaService.CodigoUsuario
        }
this.spinner.show()
        if(validacao){
          this.CriarContaService.cadastrarNovaSenha(body).subscribe((subscribe:Retorno) =>{
            if(subscribe){
              this.spinner.hide()
            }
            if(subscribe.Codigo == 200){
              this.ModalService.modalSenhaOk()
              console.log('senhaCadastradaComSucesso', subscribe.Mensagem)
              this.router.navigate(['menu'])
            }
        })
        }else {
          this.ValidationFormService.erro.status =false;
          this.spinner.hide()
        }

       
    
   
      }


 

}
