import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { StatusBarService } from './services/progress-bar-Service/status-bar.service';
import { ModalService } from '../modal/Services/modal.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar: ElementRef<HTMLElement>

  subscription$: Subscription;
  timeOut: any;

  constructor(private statusBarService: StatusBarService, private modalService: ModalService) {
  }

  ngOnInit() {

    this.subscription$ = this.statusBarService.progressBar$.subscribe((observe) => {
      this.timeOut = observe;
      console.log('em execução ', observe)
      this.timeOut = observe;
      if (this.timeOut === true) {
        this.modalService.tempoAcabar()
        this.subscription$.unsubscribe();
      }
      console.log(observe)
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();

  }

}
