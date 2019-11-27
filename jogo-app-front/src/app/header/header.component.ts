import { Component, OnInit, OnChanges } from '@angular/core';

import { IUser } from '../models/User';
import { HeaderService } from './services/header.service';
import { ModalService } from '../modal/Services/modal.service';
import { AuthTokenService } from '../auth-services/header-token/token.service';

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

 
  
  ngOnInit(): void {  
    this.decodedToken = this.AuthTokenService.showDecodedJwt()
    this.username = this.decodedToken.Username;
    this.username = this.username.toLowerCase().replace(/(?:^|\s)\S/g, 
                                               function(a) { return a.toUpperCase(); });
                                                         

     this.headerService.verificaMenuLogado();
     
    
    
  }

  



  
 

 

  


}
