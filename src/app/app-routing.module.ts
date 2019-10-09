import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { LessonsComponent } from '../app/lessons/lessons.component';
import { CriarContaComponent } from 'src/app/login/criar-conta/criar-conta.component';


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
    path: 'criarconta',
    component: CriarContaComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
