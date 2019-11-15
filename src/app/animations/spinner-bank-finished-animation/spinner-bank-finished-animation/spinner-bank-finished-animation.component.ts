import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-spinner-bank-finished-animation',
  templateUrl: './spinner-bank-finished-animation.component.html',
  styleUrls: ['./spinner-bank-finished-animation.component.css']
})
export class SpinnerBankFinishedAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieElement', {static: false}) lottieElement: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieSpinnerBankFinishedLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/spinner_bank_finished.json',
      renderer: 'svg',
      loop: false,
      autoplay: true,
      name: 'spinnerFinished'
    });
    lottieSpinnerBankFinishedLogo.play();
  }
}
