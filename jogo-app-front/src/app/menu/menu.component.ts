import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { MenuService } from './services/menu.service';
import { ModalService } from '../modal/Services/modal.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  

  constructor(private headerService:HeaderService, 
              private menuService: MenuService,
              private modalService:ModalService       ) { 
    localStorage.setItem('token', 'token'); // tem que ser implementado no login
    this.headerService.opcaoVoltar = false;
  }

 

  ngOnInit() {
    let primeiroLogin = window.localStorage.getItem('primeiroLogin');
    console.log('primeiroLogin' , primeiroLogin);
    if(primeiroLogin == 'true'){
      this.modalService.modalVerificarConfirmacaoEmail();
      localStorage.removeItem('primeiroLogin')
    }
      this.menuService.mostraMenu = true;

      this.menuService.verificaMenuLogado()
      
     
      
  }



  ngOnDestroy(): void {
    localStorage.clear()
  }

}
