import { Component, OnInit } from '@angular/core';
import { AppControllerService } from './app.controller.service';
import { Config } from './shared/models/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tableData$ = this.controller.tableData$;
  defaultConfig = this.controller.config;

  constructor(private controller: AppControllerService) {}

  ngOnInit(): void {
    this.controller.init();
  }

  onConfigChange(config: Config) {
    this.controller.configChange(config);
  }
}
