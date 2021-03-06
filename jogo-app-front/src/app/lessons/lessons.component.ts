import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { VideoService } from './services/Video-Service/video.service';

import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { tap, timeInterval } from 'rxjs/operators';
import { ModalService } from '../modal/Services/modal.service';
import { IUser } from '../models/User';
import { RetornoRodada } from '../models/RetornoRodada';
import { Retorno } from '../models/Retorno';
import { Token } from '../models/Token';
import { ArrayRetornoRodada } from '../models/ArrayRetornoRodada';
import { Palavra } from '../models/Palavra';
import { NgProgressComponent, NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-services/header-token/token.service';


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonsComponent implements OnInit {

  showAcerto: number;
  showErro: number;
  Pontos: number;
  i = 1;


  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>;
  @ViewChild(NgProgressComponent, { static: true }) bar: NgProgressComponent;

  constructor(private renderer: Renderer2,
    private VideoService: VideoService,
    private modalService: ModalService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private AuthTokenService: AuthTokenService,
    private progress: NgProgress) {


    this.token = this.AuthTokenService.showDecodedJwt();
    console.log('jwttwtw', this.token);

    this.username = this.token.Username;
    this.username = this.username.toLowerCase().replace(/(?:^|\s)\S/g,
      function (a) { return a.toUpperCase(); });


    this.user = {
      Nome: this.token.Nome,
      CodigoUsuario: this.token.CodigoUsuario,
      Sobrenome: this.token.Sobrenome,
      Username: this.token.Username,
      Senha: null,
      Email: this.token.Email,
      Score: null,
      CodigoJogo: null,
    };


  }

  username: string;
  body: any;
  token: any;
  progressRef: NgProgressRef;
  progressNumber: number;
  isPaused = false;
  menuPause = false;
  modalConfirmacaoSaida = false;
  score = 0;
  private user: IUser;
  subscription$: Subscription;
  jogadas = [];
  jogada: RetornoRodada;
  arrayPalavras = [];
  a: Palavra;
  b: Palavra;
  c: Palavra;
  d: Palavra;
  mostraOpcoes: boolean;
  yesFunction: Function;
  noFunction: Function;

  private video: any;
  private unsinitizedVideo;

  //timer gabriel
  totalTime = 7.5; //tempo total do jogo em minutos
  timeLeft = 100; //n muda
  totalPercent: number; //tempo total em segundos
  interval;

  calcularTempo(): number {
    let tempoEmSegundos = this.totalTime * 60;
    return (tempoEmSegundos / 100) * 1000;
  }

  startTimer(intervalo: number) {
    console.log(intervalo);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.onCompleteBar();
        // this.timeLeft = 60;
      }
    }, intervalo); //5 segundos de intervalo
    //fazer a conta do numero do intervalo * 100 para saber qual o tempo total
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.timeLeft = 60;
  }

  ngOnInit() {

    this.spinner.show();

    this.VideoService.jogarJogo(this.user).subscribe((jogadas: Retorno) => {

      if (jogadas.Codigo) {
        this.spinner.hide();
      }

      let a = JSON.parse(jogadas.Data) as ArrayRetornoRodada;
      console.log(a);
      a.Partida.forEach(element => {
        this.jogadas.push(element);
      });

      this.jogada = this.jogadas[0] as RetornoRodada;
      this.user.CodigoJogo = this.jogada.CodigoJogo;
      this.arrayPalavras = this.jogada.Palavras;
      this.carregaPalavra(this.arrayPalavras);
      this.video = this.jogada.Diretorio;
      this.startTimer(this.calcularTempo());
    });
  }

  setaVideo(diretorio: string) {
    this.unsinitizedVideo = diretorio;
    this.video = this.VideoService.videoSanitizer(this.unsinitizedVideo);
  }

  mostrarOpcoesUsuario() {
    this.pausar();
    this.mostraOpcoes = true;
  }

  pausar() {
    this.pauseTimer();
    this.isPaused = true;
    this.menuPause = true;
  }

  pausarJogoAcabar() {
    this.pauseTimer();
    this.isPaused = true;
  }

  voltarOpcoesUsuario() {
    this.menuPause = false;
    this.modalConfirmacaoSaida = false;
    this.retomar();
    this.mostraOpcoes = false;
  }

  mostrarMenuPause() {
    this.modalConfirmacaoSaida = true;
    this.yesFunction = () => {
      this.modalConfirmacaoSaida = false;
      this.router.navigate(['menu']);
    };
    this.noFunction = () => {
      this.modalConfirmacaoSaida = false;
    };
  }

  mostraPontuacao() {
    this.mostraOpcoes = false;
    this.modalConfirmacaoSaida = true;
    this.yesFunction = () => {
      this.modalConfirmacaoSaida = false;
      this.router.navigate(['menu/pontuacao']);
    };
    this.noFunction = () => {
      this.modalConfirmacaoSaida = false;
    };
  }

  editarConta() {
    this.mostraOpcoes = false;
    this.modalConfirmacaoSaida = true;
    this.yesFunction = () => {
      this.modalConfirmacaoSaida = false;
      this.router.navigate(['menu/editarconta']);
    };
    this.noFunction = () => {
      this.modalConfirmacaoSaida = false;
    };
  }


  sairConta() {
    this.mostraOpcoes = false;
    this.modalConfirmacaoSaida = true;
    this.yesFunction = () => {
      this.modalConfirmacaoSaida = false;
      this.AuthTokenService.clearAllTokens();
      this.router.navigate(['menu']);
    };
    this.noFunction = () => {
      this.modalConfirmacaoSaida = false;
    };
  }



  retomar() {
    this.startTimer(this.calcularTempo());
    this.isPaused = false;
  }

  onCompleteBar() {
    this.modalService.lessonsjogoAcabar(this.score);
  }


  carregaPalavra(arrayPalavras: Array<Palavra>) {
    this.a = arrayPalavras[0];
    this.b = arrayPalavras[1];
    this.c = arrayPalavras[2];
    this.d = arrayPalavras[3];
  }

  tutorial() {
    this.pausarJogoAcabar();
    this.router.navigate(['/menu/tutorial']);
  }

  modalPauseConfirmacao() {
    this.menuPause = false;
    this.modalConfirmacaoSaida = true;
  }

  closePauseConfirmacaoModal() {
    this.menuPause = false;
    this.modalConfirmacaoSaida = false;
    this.retomar();
  }

  desabilitarQuestoes() {
    this.menuPause = true;
    this.modalConfirmacaoSaida = true;
  }

  onSubmit(item, idAcerto: number) {
    this.user.Score = this.score;

    // somente executa se estiver na última rodada
    if (this.i === 15) {
      if (item.CodigoAcerto === 1) {
        this.showAcerto = idAcerto;
        setTimeout(() => {
          this.showAcerto = 0;
        }, 1000);
        this.score += 10;
      }
      if (item.CodigoAcerto === 0) {
        this.showErro = idAcerto;
        setTimeout(() => {
          this.showErro = 0;
        }, 1000);
        this.score -= 1;
      }

      this.body = {
        CodigoJogo: this.user.CodigoJogo,
        CodigoUsuario: this.token.CodigoUsuario,
        Score: this.score
      };

      this.modalService.lessonsjogoAcabar(this.score);
      this.pausarJogoAcabar();

      this.VideoService.salvarPontuacao(this.body).subscribe((subscribe: Retorno) => {
        if (subscribe.Codigo === 200) {
          console.log(subscribe.Mensagem);
        } else { console.log(subscribe.Mensagem); }
      });
    }

    // somente executa caso tenha acertado e não seja a última rodada
    if (item.CodigoAcerto === 1 && this.i <= 15) {

      this.showAcerto = idAcerto;

      setTimeout(() => {
        this.jogada = this.jogadas[this.i] as RetornoRodada;
        this.arrayPalavras = this.jogada.Palavras;

        this.showAcerto = 0;

        this.carregaPalavra(this.arrayPalavras);
        this.setaVideo(this.jogadas[this.i].Diretorio);
        this.score += 10;
        this.i++;
        console.log(this.i, '<15');
      }, 1000);


    } else {
      this.showErro = idAcerto;
      setTimeout(() => {
        this.showErro = 0;
      }, 1000);
      this.i += 0;
      if (this.score !== 0) {
        this.score -= 1;
      } else {
        this.score = 0;
      }

      /*  if (this.i === 15) {
        console.log(this.i, 'i final')
        this.modalService.jogoAcabar()
      /*  this.VideoService.salvarPontuacao() */

    }



  }

}
