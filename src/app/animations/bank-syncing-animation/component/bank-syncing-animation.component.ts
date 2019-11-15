import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-bank-syncing-animation',
  templateUrl: './bank-syncing-animation.component.html',
  styleUrls: ['./bank-syncing-animation.component.css']
})
export class BankSyncingAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('lottieElement', {static: false}) lottieElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieFinerioLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/sync_loading.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'bank-syncing'
    });
    lottieFinerioLogo.setSpeed(.8);
    lottieFinerioLogo.play();
  }
}
