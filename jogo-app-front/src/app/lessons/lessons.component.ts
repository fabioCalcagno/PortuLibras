import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoSanitizerService } from '../lessons/services/video-sanitizer.service'

import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators'






@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {




  @ViewChild('alertWrapper', { read: ElementRef, static: false }) private alertWrapper: ElementRef<HTMLDivElement>;
  @ViewChild('answer1', { read: ElementRef, static: false }) private answer1: ElementRef<HTMLDivElement>
  @ViewChild('alertTitle', { read: ElementRef, static: false }) private alertTitle: ElementRef<HTMLElement>
  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>





  constructor(private renderer: Renderer2, private videoSanitizer: VideoSanitizerService) { }

  a: string = 'Trabalhar';
  b: string = 'Brincar';
  c: string = 'Coçar';
  d: string = 'Respirar';
  e: string = 'Rir';

  score: number = 0;
  temCerteza: boolean = false;
  answeredQuestion: string;
  counter = 45;
  private timeOut: any = false;
  private acertou = false;



  private video: any = "../../assets/imagens/cortado.mp4";
  private unsinitizedVideo;
  private temporizador;




  progressBar = new Observable((subscriber) => {
    var width = 100;
    var id = setInterval(frame, 50);

    if (this.acertou === true) {
      console.log(this.timeOut, 'inside observable acertou')
     this.subscription$.unsubscribe()
    }
    function frame() {
      if (width <= 1) {
        subscriber.next(true)
        subscriber.complete()
        return clearInterval(id);
      }
      else {
        width--;
        this.myBar.style.width = width + '%';
      }
    }

  })


  subscription$: Subscription;

  ngOnInit() {
   
    this.subscription$ = this.progressBar
      .pipe(tap(value => {
        console.log(value, 'valor do pipe')
      }))
      .subscribe(subscrib => {
        this.timeOut = subscrib
        console.log(this.timeOut, 'onInit')
        
      })


  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }




  removeModal(item) {
    return setTimeout(() => {
      item.nativeElement.style.display = 'none';
      this.alertWrapper.nativeElement.className = 'alert-wrapper';
    }, 5000);
  }




  onSubmit(item) {
   
    if (item == 'Trabalhar') {
     /*  this.alertWrapper.nativeElement.style.display = 'inherit';
      this.alertWrapper.nativeElement.style.backgroundColor = '#22e245';
      this.answeredQuestion = ' Você Acertar!'; */
      this.unsinitizedVideo = "../../assets/imagens/Trabalhar.mp4"
      this.video = this.videoSanitizer.videoSanitizer(this.unsinitizedVideo);
     
      this.acertou = true;
      this.subscription$ =
        this.progressBar.pipe(tap(value => {
          console.log(value, 'pipe submit')

        }))
          .subscribe(subscrib => {
            this.timeOut = subscrib
            console.log(this.timeOut, 'submit')
          })


      if (this.score > 0) {
        this.score = this.score + 10;
      } else this.score = 10;
      this.removeModal(this.alertWrapper);

    } else {
      if (this.score == 0) {
        this.score = 0
      }
      else {
        this.score = this.score - 1;
      }
      this.alertWrapper.nativeElement.style.display = 'inherit';
      this.alertWrapper.nativeElement.className = 'alert-wrapper1';
      this.answeredQuestion = ' Você errar ';
      this.removeModal(this.alertWrapper);
      this.temCerteza = true;




    }
  }
  ficarNoJogo(item: boolean) {
    this.timeOut = false;
    if (item) {
      console.log(this.timeOut + '  escolheu ficar')
      this.subscription$ = this.progressBar.pipe(tap(value => {
        console.log('modal valor' +  value)
      })).subscribe(subscrib => {
        this.timeOut = subscrib
        console.log(this.timeOut, 'modal')
      })
    } else {
      console.log(this.temCerteza + 'escolheu sair');
      this.timeOut = false;
      this.temCerteza = true
    }
  }






}