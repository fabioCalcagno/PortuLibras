import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { LessonsComponent } from '../app/lessons/lessons.component';
import { CriarContaComponent } from 'src/app/login/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';
import { ScoreComponent } from "../app/score/score.component"
import { MenuComponent } from '../app/menu/menu.component'
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'lessons',
    component: LessonsComponent
  },
  {
    path: 'menu',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
      },
    {
      path: 'pontuacao',
      component:ScoreComponent,
    },
    {
      path: 'redefinir',
      component: RecuperarSenhaComponent
    },
    {
      path: 'criarconta',
      component: CriarContaComponent
    },
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
