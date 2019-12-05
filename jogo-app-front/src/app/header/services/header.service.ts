import { Injectable, OnInit } from '@angular/core';
import { ModalService } from '../../modal/Services/modal.service';
import { MenuService } from '../../menu/services/menu.service';




@Injectable({
  providedIn: 'root'
})
export class HeaderService {



  constructor(private modalService: ModalService,
    private menuService: MenuService,

  ) {
    this.opcaoVoltar = true;
  }

  rotaVoltar: string = '/menu';
  menuLogado: boolean = false;
  telaVoltar: string = "Menu";
  opcaoVoltar: boolean = true;

  mostraOpcoes(item: boolean) {
    this.modalService.mostraOpcoesUsuario(item);
    this.menuService.mostrarMenu(!item);
  }


  verificaMenuLogado() {
    this.menuLogado = this.menuService.verificaMenuLogado();
    console.log('xxxxxxxxxx', this.menuLogado);
  }





}
