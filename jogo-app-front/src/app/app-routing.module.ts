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
import { CreditosComponent } from './creditos/creditos.component'
import { TutorialComponent } from './tutorial/tutorial.component';
import { EditarContaComponent } from './editar-conta/editar-conta.component';
import { NovaSenhaComponent } from './login/recuperar-senha/nova-senha/nova-senha.component';
import { AuthGuardService } from '../app/auth-services/Route-guard/auth-guard.service'


const routes: Routes = [



  //redirecionamentos nescessarios
  {
    path: 'menu/login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
   {
    path: 'redefinir/login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login/redefinir',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login/criarconta',
    redirectTo: 'criarconta',
    pathMatch: 'full'
  }, 
  {
    path: 'criarconta',
    component: CriarContaComponent,
  },
  
  {
    path: 'login',
    component: LoginComponent,
    children: [
          {
          path: 'redefinir',
          component: RecuperarSenhaComponent,
        },
        
          {
            path: 'redefinirsenha',
            component: NovaSenhaComponent,
        
          },
          {
            path: 'criarconta',
            component: CriarContaComponent,
          },
        
      ]
      },

  {
    path: 'redefinir',
    component: RecuperarSenhaComponent,
  },
  {
    path: 'redefinirsenha',
    component: NovaSenhaComponent,

  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [AuthGuardService]
  },


  
 // rotas com o header
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
        component: ScoreComponent,
      },
      {
        path: 'redefinir',
        component: RecuperarSenhaComponent,
      },
      {
        path: 'creditos',
        component: CreditosComponent,
      },
      {
        path: 'tutorial',
        component: TutorialComponent,
      },
      {
        path: 'editarconta',
        component: EditarContaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'criarconta',
        component: CriarContaComponent,
      },
    ]
  },
  /*   {
      path: '**',
      redirectTo: 'menu',
    }, */


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
