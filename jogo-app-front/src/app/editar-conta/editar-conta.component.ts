import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/services/header.service';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.component.html',
  styleUrls: ['./editar-conta.component.css']
})
export class EditarContaComponent implements OnInit {

  constructor(private headerService:HeaderService) {
      this.headerService.opcaoVoltar = true;
   }

  ngOnInit() {
  }

}
