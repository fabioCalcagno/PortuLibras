import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../header/services/header.service'

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  constructor(private headerService:HeaderService) { 
    this.headerService.opcaoVoltar = true;
  }

  ngOnInit() {
  }

}
