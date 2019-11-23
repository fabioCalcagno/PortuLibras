import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LessonsComponent } from './lessons/lessons.component';
import { CriarContaComponent } from './login/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';
import { ScoreComponent } from "./score/score.component"
import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import{ CreditosComponent } from './creditos/creditos.component'
import { TutorialComponent } from './tutorial/tutorial.component';


const routes: Routes = [
  {
    path: 'teste',
    component: ModalComponent,
  },
  {
    path: '',
    component: LoginComponent,
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
    {
      path: 'creditos',
      component: CreditosComponent
    },
    {
      path: 'tutorial',
      component: TutorialComponent,
    },
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
