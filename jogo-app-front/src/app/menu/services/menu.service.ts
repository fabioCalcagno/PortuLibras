import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

    mostraMenu: boolean = false;
    menuLogado:boolean = false;

    mostrarMenu(mostra:boolean){
      this.mostraMenu = mostra;
    }


    verificaMenuLogado(){
      let token = window.localStorage.getItem('token')
      console.log(token)
      if(token == 'token'){
       return this.menuLogado = true
      }else{
       return this.menuLogado = false
      }
    }

}
