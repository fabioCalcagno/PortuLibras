import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CriarContaComponent } from './login/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './score/score.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { CreditosComponent } from './creditos/creditos.component';
import {ProgressBarModule} from 'angular-progress-bar';
import { TutorialComponent } from './tutorial/tutorial.component';
import { EditarContaComponent } from './editar-conta/editar-conta.component';
import { NovaSenhaComponent } from './login/recuperar-senha/nova-senha/nova-senha.component'

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LoginComponent,
    CriarContaComponent,
    RecuperarSenhaComponent,
    ScoreComponent,
    MenuComponent,
    HeaderComponent,
    ModalComponent,
    StatusBarComponent,
    CreditosComponent,
    TutorialComponent,
    EditarContaComponent,
    NovaSenhaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
