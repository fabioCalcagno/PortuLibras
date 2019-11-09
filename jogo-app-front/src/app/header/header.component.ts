import { Component, OnInit, OnChanges } from '@angular/core';

import { IUser } from '../models/User';
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
  private user: IUser;
  
  private username;

 
  
  ngOnInit(): void {

   

     this.username = 'samuel';
    
    
  }

  
 

 

  


}
