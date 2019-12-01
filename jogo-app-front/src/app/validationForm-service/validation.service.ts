import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor() { }

   erro = {
    status: false,
    msg: '',
  }


  campoValidate(user: FormGroup) {
    this.erro.msg = '';
   
    
    
    if (user.controls['Nome'].invalid && user.controls['Nome'].touched ) {
      if (user.controls['Nome'].errors['required']) {
        this.erro.msg = "Nome é obrigátorio";
        console.log(user.controls[''].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['minlength']) {
        this.erro.msg = "tamanho mínimo de Nome são 3 letras";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['pattern']) {
        this.erro.msg = "Somente letras no campo Nome ";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Nome'].errors['maxlength']) {
        this.erro.msg = "tamanho máximo de Nome são 20 letras";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Sobrenome'].invalid && user.controls['Sobrenome'].touched ) {
      if (user.controls['Sobrenome'].errors['required']) {
        this.erro.msg = "Sobrenome é obrigátorio";
        console.log(user.controls['Sobrenome'].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['minlength']) {
        this.erro.msg = "tamanho mínimo de Sobrenome são 2 letras";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['pattern']) {
        this.erro.msg = "Somente letras no campo Sobrenome ";
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Sobrenome'].errors['maxlength']) {
        this.erro.msg = "Tamanho máximo de Sobrenome são 50 letras";
        this.erro.status = false;
        return false;
      }
    }
    if (user.controls['Username'].invalid && user.controls['Username'].touched ) {
      if (user.controls['Username'].errors['required']) {
        this.erro.msg = "Usuário é obrigátorio";
        console.log(user.controls['Username'].errors['required'], 'erssjjsj')
        this.erro.status = false;
        return false;
      }
      else if (user.controls['Username'].errors['minlength']) {
        this.erro.msg = "tamanho mínimo de Usuário são 3 letras";
        return false;
      }
      else if (user.controls['Username'].errors['pattern']) {
        this.erro.msg = "Somente letras e números no campo Usuário ";
        return false;
      }
      else if (user.controls['Username'].errors['maxlength']) {
        this.erro.msg = "Tamanho máximo de Usuário são 10 letras";
        return false;
      }
    }
    if (user.controls['Email'].invalid && user.controls['Email'].touched ) {
      if (user.controls['Email'].errors['required']) {
        this.erro.msg = "Email é obrigátorio";
        return false;
      }
      else if (user.controls['Email'].errors['email']) {
        this.erro.msg = "Formatação de Email incompátivel";
        return false;
      }
    }
    if (user.controls['Senha'].invalid && user.controls['Senha'].touched ) {
      if (user.controls['Senha'].errors['required']) {
        this.erro.msg = "Senha é obrigátorio";
        return false;
      }
      else if (user.controls['Senha'].errors['minlength']) {
        this.erro.msg = "Tamanho mínimo de Senha são 8 letras";
        console.log(user.controls['Senha'].value, 'askjhdjakshdkasjhdkl')
        return false;
      }
      else if (user.controls['Senha'].errors['pattern']) {
        this.erro.msg = "Somente letras e números no campo Senha";
        console.log(user.controls['Senha'].value, 'valor do pattern')
        return false;
      }
      else if (user.controls['Senha'].errors['maxlength']) {
        this.erro.msg = "Tamanho máximo de Senha é de 12 letras";

        return false;
      }
    }
    if (user.controls['termo'].invalid &&  user.controls['termo'].touched) {
      this.erro.msg = "É nescessario aceitar os termo de uso"
      return false;
    }
   
    else if (user.controls['Senha'].value !== user.controls['reSenha'].value  && user.controls['reSenha'].touched ) {
      this.erro.msg = "Confirmação de senha não esta compativel com Senha"
      return false;
    }
  

    else return true;
  }


  validaNome(nome){
      let array: Array<string>  = nome.split('')
      array.forEach(letra =>{

      })
  }

}
