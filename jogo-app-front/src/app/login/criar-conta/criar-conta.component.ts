import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from '../../models/login';
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: FormGroup;
  private iuser = new User()


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router

  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null]
    })



  }



  onSubmit() {
    this.iuser = this.user.value;
    this.loginService.register(this.iuser).subscribe((signin) => {
      if (signin) {
        this.router.navigate(['/lessons'])
      }
      else this.user.reset()
    },
      (error: any) => {
        console.log(error.error)

      }
    )
  }

}
