import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { MenuService } from './services/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  

  constructor(private headerService:HeaderService, private menuService: MenuService) { 
    localStorage.setItem('token', 'token'); // tem que ser implementado no login
  }

 

  ngOnInit() {
      this.menuService.mostraMenu = true;
       
      this.menuService.verificaMenuLogado()
      
     
      
  }



  ngOnDestroy(): void {
    localStorage.clear()
  }

}
