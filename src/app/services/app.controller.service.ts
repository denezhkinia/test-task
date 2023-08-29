import { Injectable } from '@angular/core';
import { PseudoSocketService } from '../shared/services/pseudo-socket.service';
import { TableData } from '../models/table-data';
import { Config } from '../models/config';
import { BehaviorSubject } from 'rxjs';

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

  private worker: Worker;
  constructor(private pseudoSocketService: PseudoSocketService) {}

  init() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../shared/workers/table-view.worker', import.meta.url));
    }

    this.pseudoSocketService.startServer(this.config.timer, this.config.size);

    this.pseudoSocketService.getMessages().subscribe((data: TableData[]) =>
      this.worker.postMessage({
        tableData: data,
        ids: this.config.ids,
      }),
    );

    this.worker.onmessage = ({ data }) => {
      this.tableData$$.next(data);
    };
  }

  configChange(config: Config) {
    this.config = config;
    this.pseudoSocketService.updateServerParams(config.timer, config.size);
  }
}
