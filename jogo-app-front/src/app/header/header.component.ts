import { Component, OnInit, OnChanges } from '@angular/core';

import { IUser } from '../models/User';
import { HeaderService } from './services/header.service';
import { ModalService } from '../modal/Services/modal.service';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentScreen = 'Voltar'
  telaAnterior = '';
  string:string;
  stringHelper;

  constructor( private headerService: HeaderService,
                private AuthTokenService:AuthTokenService,
                private router:Router,
                private spinner: NgxSpinnerService,
               private modalService: ModalService

  ){ }
  private user: IUser;
  decodedToken:any;
  private userSubject$ = new BehaviorSubject<Token>(null)


  tutorial(){
    this.router.navigate(['/menu/tutorial'])
  }

 
  
  ngOnInit(): void {
    try{  
    this.decodedToken = this.AuthTokenService.showDecodedJwt()
    this.userSubject$.next(this.decodedToken)     
  }
    catch{
      (Error)=>{
        return Error.message
      }
    }
    
    if(this.decodedToken.Username !== undefined && this.decodedToken.Username !== null){
      this.decodedToken.Username = this.decodedToken.Username.toLowerCase().replace(/(?:^|\s)\S/g, 
                                                 function(a) { return a.toUpperCase(); });
    }
    else  this.spinner.hide();
   
   
                                         

      this.headerService.verificaMenuLogado(); 
     
    
    
  }

  



  
 

 

  


}
