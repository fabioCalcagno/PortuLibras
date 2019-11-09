import { Component, OnInit, OnChanges } from '@angular/core';

import { User } from '../models/User';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentScreen = 'Voltar'
  telaAnterior = '';
  string:string;
  stringHelper;

  constructor( private headerService: HeaderService,

  ){ }
  private user: User;
  
  private username;
  
  ngOnInit(): void {

   

     this.username = 'samuel';
    
    
  }

  
 

 

  


}
