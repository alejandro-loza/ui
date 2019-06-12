import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import LottieView from 'lottie-web';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieElement') lottieElement: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const lottieFinerioLogo = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: '../../../assets/animations/finerio_loading.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'finerio_loading'
    });
    lottieFinerioLogo.play();
  }
}
