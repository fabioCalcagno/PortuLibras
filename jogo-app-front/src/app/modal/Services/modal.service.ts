import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusBarService } from '../../status-bar/services/progress-bar-Service/status-bar.service'
import { LessonsComponent } from '../../lessons/lessons.component'
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
   
   showModal:boolean= false;
   alertTitle:string = '';
   yesOrNoButtons:boolean = false;
   okButton:boolean= false;
   sim:string = 'Sim';
   nao:string = 'Não';
   mostraOpcoes = false;
   showModalTime: boolean = false;
   statusBarService:StatusBarService;
   lessonsComponent:LessonsComponent

   


   closeModal(){
    this.showModalTime = false;
    this.showModal = false;
    this.alertTitle = "";
    this.yesOrNoButtons = false;
    this.showModal = false;
    this.okButton = false;
   }
   
   jogarNovamente(){
     this.closeModal();

   }

   mostraOpcoesUsuario(mostra:boolean){
     this.mostraOpcoes  = mostra;
   }

   

   tempoAcabar(){
    this.showModalTime = true;
    this.alertTitle = "Tempo acabar, você ter X pontos, continuar?";
    this.yesOrNoButtons = true; 
    this.okButton = false;
   }

   jogoAcabar(){
    this.showModalTime = true;
    this.alertTitle = "Jogo acabar, você ter X pontos, mais uma?";
    this.yesOrNoButtons = true; 
    this.okButton = false;
   }
  
   

  modalSenhaOk(){
      this.showModal = true;
      this.alertTitle = "Senha nova OK!";
      this.yesOrNoButtons = false; 
      this.okButton = true;
  }



  modalTrocaUsuarioOK(){
    this.showModal = true;
    this.alertTitle = "Troca usuário OK!";
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalTrocaUsuarioSenhaOK(){
    this.showModal = true;
    this.alertTitle = "Troca usuário + senha OK!";
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalVerificarConfirmacaoEmail(){
    this.showModal = true;
    this.alertTitle = "Cadastrar OK! Verificar e-mail + clicar confirmar e-mail ";
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.sim = 'E-mail trocar';
    this.nao = 'Continuar'; } 

  modalExcluirConta(){
    this.showModal = true;
    this.alertTitle = "Você perder conta! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalPauseMenuComeco(){
    this.showModal = true;
    this.alertTitle = "Você perder progresso! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modaSairdaTela(){
    this.showModal = true;
    this.alertTitle = "Você sair tela! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalSairDaConta(){
    this.showModal = true;
    this.alertTitle = "Você sair conta! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalRecuperacaoConta(){
    this.showModal = true;
    this.alertTitle = "Verificar e-mail + preencher número válido";
    this.yesOrNoButtons = false;
    this.okButton = true;
  }




}
