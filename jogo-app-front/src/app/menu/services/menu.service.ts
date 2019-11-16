import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

    mostraMenu: boolean = false;

    mostrarMenu(mostra:boolean){
      this.mostraMenu = mostra;
    }

}
