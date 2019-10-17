import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/login';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router

  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({

      email: ['',
        [
          Validators.required,
          Validators.email]
      ],
      password: ['',
        Validators.required
      ],

    })

  }


  onSubmit() {
    console.log(this.user)
  }
}
