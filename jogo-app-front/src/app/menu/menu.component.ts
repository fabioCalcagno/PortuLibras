import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { MenuService } from './services/menu.service';
import { ModalService } from '../modal/Services/modal.service';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { Token } from '../models/Token';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  constructor(private headerService:HeaderService, 
              private menuService: MenuService,
              private modalService:ModalService,
              private AuthTokenService:AuthTokenService      ) { 
                
     this.ativo = this.AuthTokenService.showDecodedJwt();
  
    this.headerService.opcaoVoltar = false;
  }

 ativo:Token;

  ngOnInit() {
    console.log(this.ativo.Ativo , 'asdds');
    if(this.ativo.Ativo ){
      this.modalService.modalVerificarConfirmacaoEmail();
     
    }
      this.menuService.mostraMenu = true;

      this.menuService.verificaMenuLogado()
      
     
      
  }





}
