import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusBarService } from '../../status-bar/services/progress-bar-Service/status-bar.service'
import { VideoService } from '../../lessons/services/Video-Service/video.service'
import { Router, RouterLink } from '@angular/router';
import { LessonsComponent } from '../../lessons/lessons.component';
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
  noFunction:Function;

  opcoesMenu:boolean = false;
  opcoesLesson:boolean = false;

  






  closeModal() {
    this.showModal = false;
    this.alertTitle = "";
    this.yesOrNoButtons = false;
    this.okButton = false;
    this.mostraOpcoes=false
  }

  lessonCloseMenuPause(){
    this.mostraOpcoes = false;
    this.opcoesLesson = false;
  }

  lessonsShowMenuPause(){
    this.mostraOpcoes = true;
    this.opcoesMenu = false;
    this.opcoesLesson = true;
    this.yesFunction = () =>{
      this.lessonModalSairJogo()
      this.lessonCloseMenuPause()
    }
    this.noFunction = () =>{
      this.lessonCloseMenuPause()
    }

  }

  
  jogarNovamente() {
    this.closeModal();
    location.reload()
  }

  mostraOpcoesUsuario(mostra: boolean) {
    this.mostraOpcoes = mostra;
    this.opcoesMenu = mostra; 
  } 

  closeUserOptionsModal(){
    this.closeModal();
   location.reload()
  }


  lessonsjogoAcabar(score) {
    this.showModal = true;
    this.alertTitle = `Jogo acabar, você ter ${score}  pontos, Novamente?`
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.yesFunction = () =>{
       this.jogarNovamente();
      this.closeModal();

    }
    this.noFunction = () =>{
     
      this.router.navigate(['/menu']).then(navigate =>{
        if(navigate) this.closeModal()
        else location.reload()
      })
     
     
    }   
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
      this.sim = 'Sim';
      this.nao = 'Não';
      this.router.navigate(['/menu/criarconta']);
      this.closeModal()
    }
    this.noFunction = ()=>{
      this.sim = 'Sim';
      this.nao = 'Não';
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

  lessonModalSairJogo() {
    this.showModal = true;
    this.alertTitle = "Você perder progresso! Você ter certeza?";
    this.yesOrNoButtons = true;
    this.okButton = false;
    
    this.yesFunction = () =>{
      this.router.navigate(['/menu'])
      this.closeModal()
    }
    this.noFunction = () =>{
      this.closeModal()
    }
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
