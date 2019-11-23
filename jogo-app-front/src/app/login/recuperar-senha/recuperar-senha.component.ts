import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeaderService } from '../../header/services/header.service';
import { HeaderComponent } from '../../header/header.component'
import { CriarContaService } from 'src/app/login/recuperar-senha/service/criar-conta.service';
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private headerService:HeaderService,
              private CriarContaService:CriarContaService
  
                                                    ) { }

  private user : FormGroup; 


  confirmacaoEmail = true;

   confirmaEmail(){
    this.confirmacaoEmail = false;
  
   }




  ngOnInit() {

    this.confirmacaoEmail=true;

    this.user = this.formBuilder.group({

      email: [null,
        [
          Validators.required,
        
          ]
      ],
     
    })
}

onSubmit(){
  console.log(this.user.value)
 let email = JSON.stringify(this.user.controls['email'].value)
 console.log('email' , email)
  this.CriarContaService.recuperarSenha(email).subscribe(subscribe => {
    if(subscribe){
      console.log('fff')
    }
  })
}






}
