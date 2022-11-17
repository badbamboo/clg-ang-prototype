import { Component, OnInit } from '@angular/core';
import { APP_CONFIG, ENV_CONFIG } from '@configuration';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  title = <any>ENV_CONFIG.APP_TITLE;
  navList = <any>APP_CONFIG.navList;
  constructor() {}

  ngOnInit(): void {}
}
