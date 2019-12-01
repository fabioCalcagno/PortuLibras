import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { ModalService } from '../../modal/Services/modal.service';
import { Token } from '../../models/Token';
import { HeaderService } from '../../header/services/header.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private AuthTokenService:AuthTokenService,
              private ModalService:ModalService
  ) {

    this.tokenDecoded = this.AuthTokenService.showDecodedJwt();
    this.userSubject.next(this.tokenDecoded)
    
   }

   
    tokenDecoded:Token;
    mostraMenu: boolean = false;
    menuLogado:boolean = false;
    private userSubject = new BehaviorSubject<Token>(null)

    mostrarMenu(mostra:boolean){
      this.mostraMenu = mostra;
    }


    verificaMenuLogado(){
      console.log(this.tokenDecoded)
      console.log(this.tokenDecoded.Ativo, 'ativo');
      
      if(this.tokenDecoded.Ativo == 'False'){
        console.log('nao esta ativo')
        this.ModalService.modalVerificarConfirmacaoEmail();
       return  this.menuLogado = true
      }
      else if(this.tokenDecoded.Ativo == undefined){
       return  this.menuLogado = false;
      }
      else if (this.tokenDecoded.Ativo == "True"){
        console.log("usuario ativo")
        return this.menuLogado = true
      }

 
    }


  }