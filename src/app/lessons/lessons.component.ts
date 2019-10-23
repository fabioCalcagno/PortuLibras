import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';



@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {



  @ViewChild('alertWrapper', { read: ElementRef, static: false }) private alertWrapper: ElementRef<HTMLDivElement>;
  @ViewChild('answer1', { read: ElementRef, static: false }) private answer1: ElementRef<HTMLDivElement>
  @ViewChild('alertTitle', { read: ElementRef, static: false }) private alertTitle : ElementRef<HTMLElement>
  @ViewChild('myBar', { read: ElementRef, static: false }) private myBar : ElementRef<HTMLElement>
/*   @ViewChild('timeOut', { read: ElementRef, static: false }) private timeOut : ElementRef<HTMLDivElement>
 */
  
 
  

  constructor(private renderer: Renderer2,) { }

  a :string = 'Trabalhar';
  b :string = 'Brincar';
  c :string = 'Coçar';
  d :string = 'Respirar';
  e :string = 'Rir';
   score: number = 0;
  timeOut:boolean =false; 
   temCerteza:boolean = false;
   answeredQuestion: string;
   counter = 45;



   setModal(){
    return new Promise(r =>{
        this.timeOut =  true;
    })
   }


   async doShowModal() {
   
        await this.setModal().then(()=>{
          console.log(this.timeOut);
        })
        
        
    }


/* 
   delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}

    async doTimer() {
        for (let i = 0; i < this.counter; i++) {
            await this.delay(1000);
            this.counter = this.counter - 1;
            console.log(this.counter);
        }
    }
 */

 

 move() {
  
  var width = 100;
  var id = setInterval(frame, 130);
  function frame() {
    if (width == 0) {   
     
      clearInterval(id);
    } else {
      width--;
      this.myBar.style.width = width + '%';
    }
  }
}


  ngOnInit(  ) {
this.move()

/* this.doTimer() */

    
    }

 
  

  removeModal(item){
    return setTimeout(() => {
      item.nativeElement.style.display = 'none';
      this.alertWrapper.nativeElement.className = 'alert-wrapper';
     }, 5000);
  }




  onSubmit(item) {
    console.log(item)
    if (item == 'Trabalhar') {
      this.alertWrapper.nativeElement.style.display = 'inherit';
      this.alertWrapper.nativeElement.style.backgroundColor = '#22e245;'
      this.answeredQuestion = ' Você Acertar!';
      
      if(this.score > 0){
        this.score = this.score + 10;
      }else this.score=  10;
      this.removeModal(this.alertWrapper);

    } else {
      if(this.score == 0){
        this.score = 0}
      else{
         this.score =  this.score  -1;}
      this.alertWrapper.nativeElement.style.display = 'inherit';
      this.alertWrapper.nativeElement.className = 'alert-wrapper1';
      this.answeredQuestion = ' Você errar ';
      this.removeModal(this.alertWrapper);
      this.temCerteza =true;
      

    
      
  }
}
        ficarNoJogo(item:boolean){
          if(item){ console.log(this.timeOut + 'escolheu ficar')
            this.timeOut = false; 
          } else { console.log(this.temCerteza + 'escolheu sair')
             this.temCerteza = true}
        }

        




}