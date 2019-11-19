import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonsComponent implements OnInit, OnDestroy {

  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>





  constructor(private renderer: Renderer2,
    private VideoService: VideoService,
    private modalService: ModalService) { }


  score: number = 0;
  temCerteza: boolean = false;
  answeredQuestion: 'teste';
  counter = 45;
  inicioJogo: boolean = false;
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

  private video: any;
  private unsinitizedVideo;





  progressBar = new Observable((subscriber) => {
    var width = 100;
    var widthHelper
    var temporizador = 50;
    var helper: boolean = false;
    var id = setInterval(frame, temporizador);

    if (this.acertou === true) {
      helper = this.acertou;
      console.log(helper)
      this.subscription$.unsubscribe()
    }
    async function frame() {

      /*  if(helper===true){
        widthHelper = await  width;
        subscriber.next(widthHelper)
       } */

      if (width <= 1) {
        subscriber.next(true)
        subscriber.complete()
        return clearInterval(id);
      }
      else {
        temporizador = temporizador--;

        width--;
        this.myBar.style.width = width + '%';
      }

    }

  })





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
      a.Partida.forEach(element => {
        this.jogadas.push(element)

      });

      this.jogada = this.jogadas[0] as RetornoRodada;
      this.arrayPalavras = this.jogada.Palavras;
      this.carregaPalavra(this.arrayPalavras)
      this.video = this.jogada.Diretorio
    })
    this.subscription$ = this.progressBar
      .pipe(tap(value => {
        console.log(value, 'valor do pipe')
      }))
      .subscribe(subscrib => {
        this.timeOut = subscrib;
        if (this.timeOut) {
          this.modalService.tempoAcabar()
        }
        console.log(this.timeOut, 'onInit')

      })


  }



  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }




  setaVideo(diretorio: string) {
    this.unsinitizedVideo = diretorio;
    this.video = this.VideoService.videoSanitizer(this.unsinitizedVideo);
  }




  carregaPalavra(arrayPalavras: Array<Palavra>) {
    this.a = arrayPalavras[0];
    this.b = arrayPalavras[1];
    this.c = arrayPalavras[2];
    this.d = arrayPalavras[3];

  }

  i:number =1;

  onSubmit(item) {

    console.log(item.CodigoAcerto, 'heiheouletsgo')

    if (item.CodigoAcerto === 1) {
     this.i ++
      this.jogada = this.jogadas[this.i] as RetornoRodada;
      this.arrayPalavras = this.jogada.Palavras;
      this.carregaPalavra(this.arrayPalavras)
      this.setaVideo(this.jogadas[this.i].Diretorio)

      
      this.subscription$ =
        this.progressBar.pipe(tap(value => {
          console.log(value, 'pipe submit')

        }))
          .subscribe(subscrib => {
            this.timeOut = subscrib
            if (this.timeOut) {
              this.modalService.tempoAcabar()
            }
            console.log(this.timeOut, 'submit')
          })


      if (this.score > 0) {
        this.score = this.score + 10;
      } else this.score = 10;


    } else {
      if (this.score == 0) {
        this.score = 0
      }
      else {
        this.score = this.score - 1;
      }

    }
  }







}