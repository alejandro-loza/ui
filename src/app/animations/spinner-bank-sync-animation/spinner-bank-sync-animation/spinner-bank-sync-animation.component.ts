import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-spinner-bank-sync-animation',
  templateUrl: './spinner-bank-sync-animation.component.html',
  styleUrls: ['./spinner-bank-sync-animation.component.css']
})
export class SpinnerBankSyncAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieElement', {static: false}) lottieElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieSpinnerBankSyncLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/spinner_bank_loading.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'spinnerSyncing'
    });
    lottieSpinnerBankSyncLogo.play();
  }
}
