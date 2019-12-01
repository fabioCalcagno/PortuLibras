import { Component, OnInit } from '@angular/core';

import{ HeaderService } from '../header/services/header.service';
import { HeaderComponent } from '../header/header.component';
import { ScoreService } from './services/apiService/score.service';
import { IScore } from '../models/Score';
import { Retorno } from '../models/Retorno';
import { Token } from '../models/Token';
import { AuthTokenService } from '../auth-services/header-token/token.service';
import { IUser } from '../models/User';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(private headerService: HeaderService,
             private AuthTokenService:AuthTokenService, 
              private scoreService:ScoreService) { 


                this.headerService.opcaoVoltar = true;
                this.headerService.rotaVoltar = 'Menu'
                this.token = AuthTokenService.showDecodedJwt() as Token
               

                this.user = {
                  Nome: this.token.Nome,
                  CodigoUsuario: this.token.CodigoUsuario,
                  Sobrenome: this.token.Sobrenome,
                  Username: this.token.Username,
                  Senha: null,
                  Email: this.token.Email,
                  Score: null ,
                  CodigoJogo:null, 
                } 
                
              

    }


user:IUser
token:any
private iScore: IScore;
private iScoreArray: Array<IScore>
score = [];
    
   
  ngOnInit() {
      this.scoreService.listaPontuacao(this.user).subscribe((subscribe:Retorno) =>{

        if(subscribe.Codigo == 200){
          this.iScoreArray = JSON.parse(subscribe.Data) 
         this.iScoreArray.forEach((pontos: IScore) => {
           this.score.push(pontos.Score)
         })
         
        
      }
      
  })

}

}
