import { Injectable } from '@angular/core';
import { PseudoSocketService } from './shared/services/pseudo-socket.service';
import { TableData } from './shared/models/table-data';
import { Config } from './shared/models/config';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Injectable({
  providedIn: 'root',
})
export class AppControllerService {
  private tableData$$: BehaviorSubject<TableData[]> = new BehaviorSubject<TableData[]>(null);
  public tableData$ = this.tableData$$.asObservable();

  data!: TableData[];
  config: Config = {
    timer: 3000,
    size: 1000,
    ids: ['1'],
  };

  private worker = new Worker(new URL('./shared/workers/table-view.worker', import.meta.url));
  constructor(private pseudoSocketService: PseudoSocketService) {}

  init() {
    this.pseudoSocketService.startServer(this.config.timer, this.config.size);

    this.pseudoSocketService.getMessages().subscribe((data: TableData) =>
      this.worker.postMessage({
        tableData: data,
        ids: this.config.ids,
      }),
    );

    this.worker.onmessage = ({ data }) => {
      console.log('data', data);
      this.tableData$$.next(data);
    };
  }

  configChange(config: Config) {
    this.config = config;
    this.pseudoSocketService.updateServerParams(config.timer, config.size);
  }
}
