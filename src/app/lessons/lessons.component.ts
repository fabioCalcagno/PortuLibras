import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {



  @ViewChild('alertWrapper', { read: ElementRef, static: false }) private alertWrapper: ElementRef<HTMLDivElement>;
  @ViewChild('answer1', { read: ElementRef, static: false }) private answer1: ElementRef<HTMLDivElement>
  

  constructor(private renderer: Renderer2, ) { }
  a :string = 'Chorar';
  b :string = 'Brincar';
  c :string = 'Coçar';
  d :string = 'Respirar';
  e :string = 'Rir';

  ngOnInit(  ) {  }

 
  answeredQuestion: string;

  removeModal(){
    return setTimeout(() => {
      this.alertWrapper.nativeElement.style.display = 'none';
     }, 10000);
  }

  @HostListener('mouseover') 
   onMouseOver() {
       this.renderer.addClass(this.answer1.nativeElement, 'animated-bounceInDown-fast');
       console.log('oii')
   }


  onSubmit(item) {
    console.log(item)
    if (item == 'Chorar') {
      this.alertWrapper.nativeElement.style.display = 'inherit';
      this.answeredQuestion = ' Você Acertar';
      this.removeModal();

    } else {
      this.alertWrapper.nativeElement.style.display = 'inherit';
      this.answeredQuestion = ' Você errar '
      this.removeModal();
      
  }
}






}