import { Injectable, OnInit } from '@angular/core';
import { ModalService } from '../../modal/Services/modal.service';
import { MenuService } from '../../menu/services/menu.service';




@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  

  constructor(private modalService:ModalService, 
              private menuService:MenuService,
             
                ) { 
    
  }

  rotaVoltar:string = '/menu';
  
  mostraOpcoes(item:boolean){
      this.modalService.mostraOpcoesUsuario(item);
      this.menuService.mostrarMenu(!item)
  }


 



}
