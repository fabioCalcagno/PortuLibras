import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeaderService } from '../../header/services/header.service';
import { HeaderComponent } from '../../header/header.component'
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private headerService:HeaderService
  
                                                    ) { }

  private user : FormGroup; 
  private headerComponent: HeaderComponent;

  confirmacaoEmail = true;

   confirmaEmail(){
    this.confirmacaoEmail = false;
  
   }



  ngOnInit() {
    this.confirmacaoEmail=true;
  
   
}

}
