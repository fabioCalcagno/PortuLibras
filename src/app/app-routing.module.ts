import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsComponent } from '../app/lessons/lessons.component';


const routes: Routes = [
  {path: 'lessons' ,
   component: LessonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
