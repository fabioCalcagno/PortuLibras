import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './services/Video-Service/video.service'

import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { tap, timeInterval } from 'rxjs/operators'
import { ModalService } from '../modal/Services/modal.service';
import { IUser } from '../models/User';
import { RetornoRodada } from '../models/RetornoRodada';
import { Retorno } from '../models/Retorno';
import { ArrayRetornoRodada } from '../models/ArrayRetornoRodada';
import { Palavra } from '../models/Palavra';
import { NgProgressComponent, NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonsComponent implements OnInit, AfterViewInit {

  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>;
  @ViewChild(NgProgressComponent, { static: true }) bar: NgProgressComponent;

  constructor(private renderer: Renderer2,
    private VideoService: VideoService,
    private modalService: ModalService,
    private router: Router,
    private progress: NgProgress) { }


  progressRef: NgProgressRef;
  progressNumber: number;
  isPaused: boolean = false;
  paused:boolean = false;
  irMenu:boolean = false;
  score: number = 0;
  private timeOut: any = false;
  private acertou = false;
  private user: IUser;
  subscription$: Subscription;
  jogadas = [];
  jogada: RetornoRodada;
  arrayPalavras = [];
  a: Palavra;
  b: Palavra;
  c: Palavra;
  d: Palavra;

body : {
  CodigoUsuario:number,
	CodigoJogo:number,
	Score:number,
}


  private video: any;
  private unsinitizedVideo;

  //timer gabriel
  totalTime: number = 7.5; //tempo total do jogo em minutos
  timeLeft: number = 100; //n muda
  totalPercent: number; //tempo total em segundos
  interval;

  calcularTempo(): number {
    let tempoEmSegundos = this.totalTime * 60;
    return (tempoEmSegundos/100) * 1000;
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
    }, intervalo) //5 segundos de intervalo
    //fazer a conta do numero do intervalo * 100 para saber qual o tempo total
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.timeLeft = 60;
  }

  ngOnInit() {
   

    this.user = {
      Nome: 'a',
      CodigoUsuario: 4,
      Sobrenome: 'a',
      Username: 'a',
      Senha: 'a',
      Email: 'a',
    }

    this.VideoService.jogarJogo(this.user).subscribe((jogadas: Retorno) => {
      let a = JSON.parse(jogadas.Data) as ArrayRetornoRodada;
      console.log(a)
      a.Partida.forEach(element => {
        this.jogadas.push(element)
      });

      this.jogada = this.jogadas[0] as RetornoRodada;
      localStorage.setItem('CodigoUsuario', 'this.user.CodigoUsuario')
      this.arrayPalavras = this.jogada.Palavras;
      this.carregaPalavra(this.arrayPalavras)
      this.video = this.jogada.Diretorio
    })
  }

  ngAfterViewInit() {
    this.startTimer(this.calcularTempo());
  }

  setaVideo(diretorio: string) {
    this.unsinitizedVideo = diretorio;
    this.video = this.VideoService.videoSanitizer(this.unsinitizedVideo);
  }

  pausar() {
    this.pauseTimer();
    this.isPaused = true; 
    this.paused = true;
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

  tutorial(){
    this.router.navigate(['/menu/tutorial'])
  }

  modalPauseConfirmacao(){
    this.paused = false;
    this.irMenu = true;
  }

  closePauseConfirmacaoModal(){
    this.paused = false;
    this.irMenu =false;
    this.retomar();
  }

  desabilitarQuestoes(){
    this.paused = true;
    this.irMenu =true;
  }


Pontos:number;

  i: number = 1;

  onSubmit(item) {
    console.log(this.i , 'inicio')

    if(this.i === 15 ){
      if(item.CodigoAcerto === 1 ){this.score+=10}
        if(item.CodigoAcerto===0 ){this.score-=1}

        this.modalService.lessonsjogoAcabar(this.score);
          this.Pontos = this.score
        this.VideoService.salvarPontuacao(this.user.CodigoUsuario , this.Pontos).subscribe((subscribe:Retorno)=>{
          if(subscribe.Codigo == 200){
            console.log(subscribe.Mensagem)
          }else console.log(subscribe.Mensagem)
        })
      }

    if (item.CodigoAcerto === 1 && this.i <=15 ) {
     
        this.jogada = this.jogadas[this.i] as RetornoRodada;
        this.arrayPalavras = this.jogada.Palavras;
        this.carregaPalavra(this.arrayPalavras)
        this.setaVideo(this.jogadas[this.i].Diretorio)
        this.score +=10;
        this.i++;
        console.log(this.i , '<15');
        }
          
     else{
       this.i += 0
      if( this.score !== 0 ) {
        this.score -=1;
      }
      else{
        this.score = 0;
      }
      
      /*  if (this.i === 15) {
        console.log(this.i, 'i final')
        this.modalService.jogoAcabar()
      /*  this.VideoService.salvarPontuacao() */
       
    }
      


  }

}
