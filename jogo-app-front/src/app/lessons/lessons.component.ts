import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from '../lessons/services/video-sanitizer/video-sanitizer.service'

import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { tap, timeInterval } from 'rxjs/operators'
import { ModalService } from '../modal/Services/modal.service';
import { IUser } from '../models/User';
import { RetornoRodada } from '../models/RetornoRodada';
import { Retorno } from '../models/Retorno';


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

export class LessonsComponent implements OnInit, OnDestroy {

  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>





  constructor(private renderer: Renderer2, 
              private VideoService: VideoService,
             
              private modalService: ModalService ) { }

  a  = 'Trabalhar'; 
  b  = 'Brincar';
  c  = 'Coçar';
  d  = 'Respirar';
 

  score: number = 0;
  temCerteza: boolean = false;
  answeredQuestion: 'teste';
  counter = 45;
  private timeOut: any = false;
  private acertou = false;
  private user : IUser;



  private video: any = "../../assets/imagens/cortado.mp4";
  private unsinitizedVideo;
   




  progressBar = new Observable((subscriber) => {
    var width = 100;
    var widthHelper 
    var temporizador = 50;
    var helper:boolean = false;
    var id = setInterval(frame , temporizador); 

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
        temporizador = temporizador --;
       
        width--;
        this.myBar.style.width = width + '%';
      }
      
    }

  })


  subscription$: Subscription;

  ngOnInit() {

    this.user = {
      Nome: 'a',
      CodigoUsuario: 4,
      Sobrenome: 'a',
      Username: 'a',
      Senha: 'a',
      Email: 'a',
    }

    this.VideoService.jogarJogo(this.user).subscribe((jogadas:Retorno) =>{
      
      console.log(jogadas.Data)
     let a  = JSON.parse(jogadas.Data) as RetornoRodada;
     this.a = a.PalavraCorreta
    console.log(a.Diretorio)
       
     })
      
       
    
   
    this.subscription$ = this.progressBar
      .pipe(tap(value => {
        console.log(value, 'valor do pipe')
      }))
      .subscribe(subscrib => {
        this.timeOut = subscrib;
        if(this.timeOut){
          this.modalService.tempoAcabar()
        }
        console.log(this.timeOut, 'onInit')
        
      })


  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }







  onSubmit(item) {
   
    if (item == 'Trabalhar') {
    
      this.unsinitizedVideo = "../../assets/videos/6.mp4"
      this.video = this.VideoService.videoSanitizer(this.unsinitizedVideo);
     
      this.acertou = true;
      this.subscription$ =
        this.progressBar.pipe(tap(value => {
          console.log(value, 'pipe submit')

        }))
          .subscribe(subscrib => {
            this.timeOut = subscrib
            if(this.timeOut){
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