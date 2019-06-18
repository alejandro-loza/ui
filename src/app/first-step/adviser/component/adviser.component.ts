import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ConfigService} from '@services/config/config.service';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit, OnDestroy {
  username: string;
  constructor(
    private configService: ConfigService,
    private renderer: Renderer2
  ) {
    this.renderer.removeClass(document.getElementById('first-container-access'), 'container');
    this.renderer.removeClass(document.getElementById('background-container'), 'background');
    this.renderer.removeClass(document.getElementById('first-col-access'), 'col');
    this.username = this.configService.getUser.name;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.renderer.addClass(document.getElementById('first-container-access'), 'container');
    this.renderer.addClass(document.getElementById('background-container'), 'background');
    this.renderer.addClass(document.getElementById('first-col-access'), 'col');
  }
}
