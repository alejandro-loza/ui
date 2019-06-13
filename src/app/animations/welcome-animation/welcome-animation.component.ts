import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-welcome-animation',
  templateUrl: './welcome-animation.component.html',
  styleUrls: ['./welcome-animation.component.css']
})
export class WelcomeAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieElement') lottieElement: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieFinerioLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/finerio_logo.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'finerio_logo'
    });
    lottieFinerioLogo.play();
  }
}
