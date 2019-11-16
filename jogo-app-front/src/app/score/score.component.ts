import { Component, OnInit } from '@angular/core';

import{ HeaderService } from '../header/services/header.service';
import { HeaderComponent } from '../header/header.component';
import { ScoreService } from './services/apiService/score.service';
import { IScore } from '../models/Score';
import { Retorno } from '../models/Retorno';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(private headerService: HeaderService,
              private headerComponent:HeaderComponent, 
              private scoreService:ScoreService) { }


private iScore: IScore;
score = [10000,2000,3000,4000,500,600,700,800,100,200,300,400,500,60,60,8,9,1];
    
   
  ngOnInit() {
  
  
    /* this.headerComponent.currentScreen='Menu começo';
    this.scoreService.buscarPontuacaoUsuario(this.iScore)
                     .subscribe((pontos:Retorno) =>{
                       console.log(pontos)
                     })
 */
      
  }

}
