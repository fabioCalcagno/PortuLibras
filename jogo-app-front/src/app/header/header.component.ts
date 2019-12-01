import { Component, OnInit, OnChanges } from '@angular/core';

import { IUser } from '../models/User';
import { HeaderService } from './services/header.service';
import { ModalService } from '../modal/Services/modal.service';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../models/Token';

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
               private modalService: ModalService

  ){ }
  private user: IUser;
  decodedToken;
  private username:string;
  private teste:string = 'ola'
  private userSubject$ = new BehaviorSubject<Token>(null)

 
  
  ngOnInit(): void {
    try{  
    this.decodedToken = this.AuthTokenService.showDecodedJwt()
      this.userSubject$.next(this.decodedToken)
  }
    catch{
      (Error)=>{
        return this.decodedToken.Username = this.teste.valueOf
      }
    }
    if(this.decodedToken.Username !== undefined){
      this.username = this.decodedToken.Username;
      this.username = this.username.toLowerCase().replace(/(?:^|\s)\S/g, 
                                                 function(a) { return a.toUpperCase(); });
    }
    else  console.log(this.decodedToken.Username)
   
   
                                                         

      this.headerService.verificaMenuLogado(); 
     
    
    
  }

  



  
 

 

  


}
