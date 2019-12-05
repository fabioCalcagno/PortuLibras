import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { error } from 'util';
import { Retorno } from 'src/app/models/Retorno';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent implements OnInit {

  email: string;
  mensagemErro: string;
  erro: boolean = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {
    this.route.queryParamMap.subscribe(queryParam => {
      this.email = queryParam.get("email");
    });
  }

  ngOnInit() {
    this.loginService.confirmarEmail(this.email).subscribe((retorno: Retorno) => {
      switch (retorno.Codigo) {
        case 200:

          break;
        default:
          this.mensagemErro = retorno.Mensagem;
          this.erro = true;
      }

    }, error => {
    });
  }

}
