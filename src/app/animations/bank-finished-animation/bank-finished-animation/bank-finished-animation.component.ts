import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-bank-finished-animation',
  templateUrl: './bank-finished-animation.component.html',
  styleUrls: ['./bank-finished-animation.component.css']
})
export class BankFinishedAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('lottieElement', {static: false}) lottieElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieBankFinished = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/sync_success.json',
      renderer: 'svg',
      loop: false,
      autoplay: true,
      name: 'bankFinished'
    });
    lottieBankFinished.play();
  }
}
