import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private user: User,

  )

{ }
private currentScreen:string

  ngOnInit() {
 this.currentScreen = 'menu começo'
  }

}
