import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusBarService } from '../../status-bar/services/progress-bar-Service/status-bar.service'
import { VideoService } from '../../lessons/services/Video-Service/video.service'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private router: Router) { }

  showModal: boolean = false;
  alertTitle: string = '';
  yesOrNoButtons: boolean = false;
  yesOrNoButtonsPerderProgresso:boolean;
  okButton: boolean = false;
  sim: any = 'Sim';
  nao: any = 'Não';
  mostraOpcoes = false;
  showModalTime: boolean = false;
  statusBarService: StatusBarService;
  videoService: VideoService
  opcoesUser:boolean
  pauseMenu:boolean = false;

  yesFunction:Function;
  noFunction:Function
  






  closeModal() {
    this.showModalTime = false;
    this.showModal = false;
    this.alertTitle = "";
    this.yesOrNoButtons = false;
    this.yesOrNoButtonsPerderProgresso=false;
    this.showModal = false;
    this.okButton = false;
  }

  closePauseConfirmacaoModal(){
    this.closeModal();
    
   
  }

  closepauseMenuModal(){
    this.pauseMenu = false;
  }

  showPauseMenu(){
    this.pauseMenu = true;
    console.log('pausemenu', this.pauseMenu)
  }

  jogarNovamente() {
    this.closeModal();
    location.reload()
  }

  modalPauseConfirmacao(){
    this.closepauseMenuModal()
    this.showModal = true;
    this.alertTitle = "Você perder progresso! Você ter certeza?";
    this.yesOrNoButtonsPerderProgresso = true;
    this.yesOrNoButtons = false;
    this.okButton = false;
  }

  pauseConfirmouSaida(){
     this.closeModal()
     this.router.navigate(['/menu']);
  }



  mostraOpcoesUsuario(mostra: boolean) {
    this.mostraOpcoes = mostra;
    
    
  } 

  closeUserOptionsModal(){
    this.closeModal();
    location.reload()
  }


  tempoAcabar() {
    this.showModalTime = true;
    this.alertTitle = "Tempo acabar, você ter X pontos, continuar?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  jogoAcabar() {
    this.showModalTime = true;
    this.alertTitle = "Jogo acabar, você ter X pontos, mais uma?";
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.yesOrNoButtonsPerderProgresso=false;
  }



  modalSenhaOk() {
    this.showModal = true;
    this.alertTitle = "Senha nova OK!";
    this.yesOrNoButtons = false;
    this.okButton = true;
  }



  modalTrocaUsuarioOK() {
    this.showModal = true;
    this.alertTitle = "Troca usuário OK!";
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalTrocaUsuarioSenhaOK() {
    this.showModal = true;
    this.alertTitle = "Troca usuário + senha OK!";
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalMenuNaoLogadoJogar(){
    this.showModal = true;
    this.alertTitle = "Usuário conectado-não";
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.sim ="Entrar Conta"
    this.yesFunction = () =>{
       this.router.navigate(['']);
       this.closeModal()
      
    } 
    this.nao = 'Cadastrar';
    this.noFunction = () =>{
      this.router.navigate(['/menu/criarconta']);
      this.closeModal()
    }
  }

  modalVerificarConfirmacaoEmail() {
    this.showModal = true;
    this.alertTitle = "Cadastrar OK! Verificar e-mail + clicar confirmar e-mail ";
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.sim = 'E-mail trocar';
    this.nao = 'Continuar';
    this.yesFunction = ()=>{
      this.router.navigate(['/menu/criarconta']);
      this.closeModal()
    }
    this.noFunction = ()=>{
      this.router.navigate(['/menu']);
      this.closeModal()
    }
  }

  modalExcluirConta() {
    this.showModal = true;
    this.alertTitle = "Você perder conta! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalPauseMenuComeco() {
    this.showModal = true;
    this.alertTitle = "Você perder progresso! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modaSairdaTela() {
    this.showModal = true;
    this.alertTitle = "Você sair tela! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalSairDaConta() {
    this.showModal = true;
    this.alertTitle = "Você sair conta! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalRecuperacaoConta() {
    this.showModal = true;
    this.alertTitle = "Verificar e-mail + preencher número válido";
    this.yesOrNoButtons = false;
    this.okButton = true;
    console.log('fui-chamado', this.showModal)
    
  }




}
