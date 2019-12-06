import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService implements OnDestroy{
  ngOnDestroy(): void {
    this.erro.msg = null;
    this.erro.status =true
  }

  constructor() {this.erro.msg = null,
                this.erro.status=false }

   erro = {
    status: false,
    msg: '',
  }




  novaSenhaCampoValidate(user: FormGroup){
    if (user.controls['Senha'].invalid && user.controls['Senha'].touched ) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "Preencher campo senha";
        this.erro.status = false;
        return false;
      }
      if (user.controls['reSenha'].errors['required']) {
        this.erro.msg = "Preencher campo confirma senha";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "Campo senha ter mínim@ 8 caracteres+";
        this.erro.status = false;
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['pattern']) {
        this.erro.msg = "Campo senha só letra + número";
        console.log(user.controls['Senha'].value, 'valor do pattern')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "Campo senha ter máxim@ 12 caracteres+";
        this.erro.status = false;
        return false;
      }
      else if(user.controls['Senha'].value !== user.controls['reSenha'].value ){
        this.erro.status = false;
        this.erro.msg = "Senha combinar-não!"
      }
    }else {
      this.erro.msg = ''
      this.erro.status = true;
      return true;
    }


  }


  campoValidate(user: FormGroup) {
   try{   
    if (user.controls['Nome'].invalid && user.controls['Nome'].touched ) {
      if (user.controls['Nome'].errors['required']) {
        this.erro.msg = "Preencher campo nome";
        console.log(user.controls[''].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['minlength']) {
        this.erro.msg = "Campo nome ter mínim@ 3 letra+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['pattern']) {
        this.erro.msg = "Campo nome só letra+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['maxlength']) {
        this.erro.msg = "Campo nome ter máxim@ 20 letra+";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Sobrenome'].invalid && user.controls['Sobrenome'].touched ) {
      if (user.controls['Sobrenome'].errors['required']) {
        this.erro.msg = "Preencher campo sobrenome";
        console.log(user.controls['Sobrenome'].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['minlength']) {
        this.erro.msg = "Campo sobrenome ter mínim@ 2 letra+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['pattern']) {
        this.erro.msg = "Campo sobrenome só letra+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['maxlength']) {
        this.erro.msg = "Campo sobrenome ter máxim@ 50 letra+";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Username'].invalid && user.controls['Username'].touched ) {
      if (user.controls['Username'].errors['required']) {
        this.erro.msg = "Preencher campo usuário";
        console.log(user.controls['Username'].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['minlength']) {
        this.erro.msg = "Campo usuário ter mínim@ 3 caractere+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['pattern']) {
        this.erro.msg = "Campo usuário só letra + número";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['maxlength']) {
        this.erro.msg = "Campo usuário ter máxim@ 10 caractere+";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Email'].invalid && user.controls['Email'].touched ) {
      if (user.controls['Email'].errors['required']) {
        this.erro.msg = "Preencher campo e-mail";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Email'].errors['email']) {
        this.erro.msg = "Preencher com e-mail válido";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Senha'].invalid && user.controls['Senha'].touched ) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "Preencher campo senha";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "Campo senha ter mínim@ 8 caracteres+";
        this.erro.status = false;
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['pattern']) {
        this.erro.msg = "Campo senha só letra + número";
        console.log(user.controls['Senha'].value, 'valor do pattern')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "Campo senha ter máxim@ 12 caracteres+";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['termo'].invalid &&  user.controls['termo'].touched) {
      this.erro.msg = "Aceitar Termos de Uso"
      this.erro.status = false;
      return false;
    }
   
    else if (user.controls['Senha'].value !== user.controls['reSenha'].value  && user.controls['reSenha'].touched ) {
      this.erro.msg = "Senha combinar-não"
      this.erro.status = false;
      return false;
    }

  

    else {
      this.erro.msg = ''
      this.erro.status = true;
      return true;
    }
  }catch (Error){
    console.log(Error.message)
    
  }
  }



 


  validacaoEditarUsuario(user: FormGroup){
    this.erro.msg = '';
    if (user.controls['Username'].invalid && user.controls['Username'].touched ) {
      if (user.controls['Username'].errors['required']) {
        this.erro.msg = "Preencher campo usuário";
        console.log(user.controls['Username'].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['minlength']) {
        this.erro.msg = "Campo usuário ter mínim@ 3 caractere+";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['pattern']) {
        this.erro.msg = "Campo usuário só letra + número";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['maxlength']) {
        this.erro.msg = "Campo usuário ter máxim@ 10 caractere+";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['SenhaAntiga'].invalid && user.controls['SenhaAntiga'].touched ) {
      if (user.controls['SenhaAntiga'].errors['required']) {
        this.erro.msg = "Preencher campo senha atual";
        this.erro.status = false;
        return false;
      }
    } 
    //ACRESCENTAR VALIDAÇÃO SE A SENHA DIGITADA CORRESPONDE AO USUÁRIO LOGADO
    
    if (user.controls['Senha'].invalid && user.controls['Senha'].touched ) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "Preencher campo senha nova";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "Campo senha nova ter mínim@ 8 caracteres+";
        this.erro.status = false;
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['pattern']) {
        this.erro.msg = "Campo senha nova só letra + número";
        console.log(user.controls['Senha'].value, 'valor do pattern')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "Campo senha nova ter máxim@ 12 caracteres+";
        this.erro.status = false;
        return false;
      }
    }
  
    else if (user.controls['Senha'].value !== user.controls['reSenha'].value  && user.controls['reSenha'].touched ) {
      this.erro.msg = "Senha combinar-não"
      this.erro.status = false;
      return false;
    }

    if (user.controls['reSenha'].invalid && user.controls['reSenha'].touched ) {
      if (user.controls['reSenha'].errors['required']) {
        this.erro.msg = "Preencher campo repetir senha";
        this.erro.status = false;
        return false;
      }
    }
  
    else {
      this.erro.msg = ''
      this.erro.status = true;
      return true;
    }
  }
  
  campoValidateAtualizarUsuario(user: FormGroup) {
    try{   
     
     if (user.controls['Email'].invalid && user.controls['Email'].touched ) {
       if (user.controls['Email'].errors['required']) {
         this.erro.msg = "Preencher campo e-mail";
         this.erro.status = false;
         return false;
       }
       else if (user.controls['Email'].errors['email']) {
         this.erro.msg = "Preencher com e-mail válido";
         this.erro.status = false;
         return false;
       }
     }
    //SÓ O CAMPO EMAIL É VALIDADO, O RESTO VEM DISABLED. SENÃO EU ESTOU COM DUAS TELAS PRA FAER A MESMA COISA
    //EDITAR CONTA E ATUALIZAR CONTA...
 
     else {
       this.erro.msg = ''
       this.erro.status = true;
       return true;
     }
   }catch (Error){
     console.log(Error.message)
     
   }
   }





  }





