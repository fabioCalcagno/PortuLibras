import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusBarService } from '../../status-bar/services/progress-bar-Service/status-bar.service';
import { VideoService } from '../../lessons/services/Video-Service/video.service';
import { Router, RouterLink } from '@angular/router';
import { ExcluirService } from '../../editar-conta/service/excluir.service';
import { Retorno } from '../../models/Retorno';
import { AuthTokenService } from '../../auth-services/header-token/token.service';
import { LoginService } from '../../login/services/login/login.service';
import { CadastrarUsuarioService } from '../../login/criar-conta/services/cadastro/cadastrar-usuario.service';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private router: Router,
              private AuthTokenService: AuthTokenService,
              private CadastrarUsuarioService:CadastrarUsuarioService,
              private LoginService: LoginService) { }

  showModal = false;
  alertTitle = '';
  yesOrNoButtons = false;
  yesOrNoButtonsPerderProgresso: boolean;
  okButton = false;
  sim: any = 'Sim';
  nao: any = 'Não';
  mostraOpcoes = false;
  showModalTime = false;
  statusBarService: StatusBarService;
  videoService: VideoService;
  opcoesUser: boolean;
  pauseMenu = false;
  private ExcluirService: ExcluirService;

  yesFunction: Function;
  noFunction: Function;

  opcoesMenu = false;
  opcoesLesson = false;





  sairConta() {
    localStorage.clear();
    this.closeModal();
    location.reload();


  }


  closeModal() {
    this.showModal = false;
    this.alertTitle = '';
    this.yesOrNoButtons = false;
    this.okButton = false;
    this.mostraOpcoes = false;
  }

  lessonCloseMenuPause() {
    this.mostraOpcoes = false;
    this.opcoesLesson = false;
  }

  lessonsShowMenuPause() {
    this.mostraOpcoes = true;
    this.opcoesMenu = false;
    this.opcoesLesson = true;
    this.yesFunction = () => {
      this.lessonModalSairJogo();
      this.lessonCloseMenuPause();
    };
    this.noFunction = () => {
      this.lessonCloseMenuPause();
    };

  }


  jogarNovamente() {
    this.closeModal();
    location.reload();
  }

  mostraOpcoesUsuario(mostra: boolean) {
    this.mostraOpcoes = mostra;
    this.opcoesMenu = mostra;
  }

  closeUserOptionsModal() {
    this.closeModal();
    location.reload();
  }

  mostraPontuacao() {
    this.mostraOpcoes = false;
    this.router.navigate(['/menu/pontuacao']);
  }

  editarConta() {
    this.mostraOpcoes = false;
    this.router.navigate(['/menu/editarconta']);
  }


  lessonsjogoAcabar(score) {
    this.showModal = true;
    this.alertTitle = `Jogo acabar, você ter ${score}  pontos, Novamente?`;
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.yesFunction = () => {
      this.jogarNovamente();
      this.closeModal();

    };
    this.noFunction = () => {

      this.router.navigate(['/menu']).then(navigate => {
        if (navigate) { this.closeModal(); } else { location.reload(); }
      });


    };
  }

  modalSenhaOk() {
    this.showModal = true;
    this.alertTitle = 'Senha nova OK!';
    this.yesOrNoButtons = false;
    this.okButton = true;
  }



  modalTrocaUsuarioOK() {
    this.showModal = true;
    this.alertTitle = 'Troca usuário OK!';
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalTrocaUsuarioSenhaOK() {
    this.showModal = true;
    this.alertTitle = 'Troca usuário + senha OK!';
    this.yesOrNoButtons = false;
    this.okButton = true;

  }

  modalMenuNaoLogadoJogar() {
    this.showModal = true;
    this.alertTitle = 'Usuário conectado-não';
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.sim = 'Entrar Conta';
    this.yesFunction = () => {
      this.router.navigate(['login']);
      this.closeModal();

    };
    this.nao = 'Cadastrar';
    this.noFunction = () => {
      this.router.navigate(['/menu/criarconta']);
      this.closeModal();
    };
  }

  modalVerificarConfirmacaoEmail() {
    this.showModal = true;
    this.alertTitle = 'Cadastrar OK! Verificar e-mail + clicar confirmar e-mail ';
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.sim = 'E-mail trocar';
    this.nao = 'Continuar';
    this.yesFunction = () => {
      this.CadastrarUsuarioService.emailTrocarDepoisDoLogin = true;
      this.sim = 'Sim';
      this.nao = 'Não';
      this.router.navigate(['/menu/criarconta']);
      this.closeModal();
    };
    this.noFunction = () => {
      this.sim = 'Sim';
      this.nao = 'Não';
      this.router.navigate(['/menu']);
      this.closeModal();
    };
  }

  modalConfirmaContaExcluida() {
    setTimeout(() => {
      this.showModal = true;
      this.alertTitle = 'Conta excluir!';
      this.yesOrNoButtons = false;
      this.okButton = true;
    }, 2000);
  }

  modalExcluirConta(user) {
    this.showModal = true;
    this.alertTitle = 'Você perder conta! Você ter certeza?';
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.yesFunction = () => {
      this.closeModal();
      this.ExcluirService.excluirConta(user).subscribe((subscribe: Retorno) => {
        if (subscribe.Codigo === 200) {
          this.modalConfirmaContaExcluida();
          console.log(subscribe.Mensagem);
        }
      });
    };
    this.noFunction = () => {
      this.closeModal();

    };
  }

  lessonModalSairJogo() {
    this.showModal = true;
    this.alertTitle = 'Você perder progresso! Você ter certeza?';
    this.yesOrNoButtons = true;
    this.okButton = false;

    this.yesFunction = () => {
      this.router.navigate(['/menu']);
      this.closeModal();
    };
    this.noFunction = () => {
      this.closeModal();
    };
  }

  modalSairdaTela() {
    this.showModal = true;
    this.alertTitle = 'Você sair tela! Você ter certeza?';
    this.yesOrNoButtons = true;
    this.okButton = false;
    this.yesFunction = () => {
      this.AuthTokenService.clearAllTokens();
      this.LoginService.headerOn = true;
      this.router.navigate(['login/criarconta']);
      this.closeModal();
    };
    this.noFunction = () => {
      this.closeModal();
    };
  }

  modalSairDaConta() {
    this.showModal = true;
    this.alertTitle = 'Você sair conta! Você ter certeza?';
    this.yesOrNoButtons = true;
    this.okButton = false;
  }

  modalRecuperacaoConta() {
    this.showModal = true;
    this.alertTitle = 'Verificar e-mail + preencher número válido';
    this.yesOrNoButtons = false;
    this.okButton = true;
    console.log('fui-chamado', this.showModal);

  }





}
