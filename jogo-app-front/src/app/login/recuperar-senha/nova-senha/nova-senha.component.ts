import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderService } from '../../../header/services/header.service';
import { CriarContaService } from '../service/criar-conta.service';
import { Retorno } from '../../../models/Retorno';
import { ModalService } from '../../../modal/Services/modal.service';
import { Router } from '@angular/router';

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
              private CriarContaService:CriarContaService) { 

   
    

  }
  senhaNova:FormGroup;

  Senha:any;
  reSenha:any;





  verificaSenhasIguais(){
    
  }

  ngOnInit() {

    console.log(this.CriarContaService.CodigoUsuario, 'ver se esta aqui')

    this.senhaNova = this.formBuilder.group({

      Senha: [null,
                [
                  Validators.required,
        
                 ]
      ],
      reSenha:[null,
                  [
                    Validators.required,
                  ] 
    ]
    })

    console.log(this.senhaNova)
    
  }


  onSubmit(senha){
    console.log(senha.value, 'senhassssssssssssss')
    this.Senha = this.senhaNova.controls['Senha'].value;
    this.reSenha = this.senhaNova.controls['reSenha'].value;
    console.log(this.Senha , this.reSenha, 'isssoooososoo')

   
        let body = {
          Senha: this.Senha,
          CodigoUsuario: this.CriarContaService.CodigoUsuario
        }

        this.CriarContaService.cadastrarNovaSenha(body).subscribe((subscribe:Retorno) =>{
            if(subscribe.Codigo == 200){
              this.ModalService.modalSenhaOk()
              console.log('senhaCadastradaComSucesso', subscribe.Mensagem)
              this.router.navigate(['menu'])
            }else{
              console.log(subscribe.Mensagem)
            }
        })
    
   
      }


 

}
