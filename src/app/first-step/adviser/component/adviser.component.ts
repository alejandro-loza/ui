import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@services/config/config.service';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  username: string;

  constructor( private configService: ConfigService, ) {
    this.username = this.configService.getUser.name;
  }

  ngOnInit() { }
}
