import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import LottieView from 'lottie-web';
import * as M from 'materialize-css'
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-signup-landing',
  templateUrl: './signup-landing.component.html',
  styleUrls: ['./signup-landing.component.css']
})
export class SignupLandingComponent implements OnInit {

  lottieAnimations: string[];
  stopIterationCauseClick: Boolean;
  unorderedList: HTMLCollection;

  @ViewChild('lottieElement', { static: false }) lottieElement: ElementRef;
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;

  constructor(private renderer: Renderer2) {
    this.lottieAnimations = [];
    this.lottieAnimations.push("MOVIMIENTOS_MOBILE")
    this.lottieAnimations.push("PRESUPUESTOS_MOBILE")
    this.lottieAnimations.push("CUENTAS_MOBILE")
    this.stopIterationCauseClick = false
    this.unorderedList = null;
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.startIterationBetweenList()
    const sidenav = M.Sidenav.init(this.sidenav.nativeElement, {
      'edge': 'right'
    });
  }

  procesHasBegun() {
    this.stopIterationCauseClick = true
    const INSTANCE = M.Sidenav.getInstance(this.sidenav.nativeElement);
    INSTANCE.close();
  }

  startIterationBetweenList() {
    this.unorderedList = document.getElementsByClassName('listElement')
    let itemsCount = this.unorderedList.length
    let counter = 0;
    let iteratorProcess = () => {
      setTimeout(() => {
        counter == itemsCount - 1 ? counter = 0 : counter++
        this.setAllInactiveState(itemsCount)
        this.setActiveState(counter);
        !this.stopIterationCauseClick ? iteratorProcess() : null
      }, 4000);
    }
    this.setActiveState(counter);
    iteratorProcess();
  }

  setAllInactiveState(limit: number) {
    for (let i = 0; i < limit; i++) {
      this.unorderedList[i].classList.remove('active');
    }
  }

  setActiveState(index: number) {
    this.unorderedList[index].classList.add('active');
    this.setupLottieAnimation(index)
  }

  itemSelectedEvent(index: number) {
    this.stopIterationCauseClick = true
    this.setAllInactiveState(this.unorderedList.length);
    this.setActiveState(index);
  }

  setupLottieAnimation(index: number) {
    const lottieAnimation = LottieView.loadAnimation({
      container: this.renderer.selectRootElement(this.lottieElement.nativeElement),
      path: `../../../assets/animations/${this.lottieAnimations[index]}.json`,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: this.lottieAnimations[index]
    });
    lottieAnimation.play();
  }

}
