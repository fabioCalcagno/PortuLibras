import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { ModalService } from '../../modal/Services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private AuthTokenService:AuthTokenService,
              private ModalService:ModalService
  ) {

    this.ativo = this.AuthTokenService.showDecodedJwt();
   }

   
    ativo:any;
    mostraMenu: boolean = false;
    menuLogado:boolean = false;

    mostrarMenu(mostra:boolean){
      this.mostraMenu = mostra;
    }


    verificaMenuLogado(){
      console.log(this.ativo.Ativo, 'ativo');
      if(this.ativo){
        this.ModalService.modalVerificarConfirmacaoEmail();
        return this.menuLogado = true
      }else{
       return this.menuLogado = false
      }
    }

}
