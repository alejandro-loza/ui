import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-security-help-animation',
  templateUrl: './security-help-animation.component.html',
  styleUrls: ['./security-help-animation.component.css']
})
export class SecurityHelpAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieElement') lottieElement: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieFinerioLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/security-help.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'security-help'
    });
    lottieFinerioLogo.play();
  }
}
