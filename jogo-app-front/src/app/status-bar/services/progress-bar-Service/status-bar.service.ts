import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';

import { ModalService } from '../../../modal/Services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>


  constructor(private modalService: ModalService) { }

  timeOut: any = false;
  acertou = false;
  subscription$: Subscription;
  tempoAcabar: boolean = false;
  tempo: number = 50;






  progressBar$ = new Observable((subscriber) => {

    var width = 100;
    var id = setInterval(frame, this.tempo);
    if (this.acertou === true) {
      this.tempo += 10;
      console.log(this.tempo)
      console.log('acertou ', this.acertou)

      return subscriber.unsubscribe()
    }
    if (width <= 10) {
      console.log('widt ta em 10', width)

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



  ngOnDestroy(): void {
    this.subscription$.unsubscribe();

  }

}
