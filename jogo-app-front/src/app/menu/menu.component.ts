import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/services/header.service';
import { MenuService } from './services/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private headerService:HeaderService, private menuService: MenuService) { }

  ngOnInit() {
      this.menuService.mostraMenu = true;
  }

}
