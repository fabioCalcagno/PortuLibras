import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  senhaNova:FormGroup;

  ngOnInit() {
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
    
  }


  onSubmit(senha){
    console.log(senha.value)
  }


 

}
