import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root',
})
export class PseudoSocketService {
  private messagesSubject = new Subject<TableData>();
  private worker = new Worker(new URL('../workers/data-generator.worker', import.meta.url));
  private intervalId: any;

  constructor() {
    this.worker.onmessage = ({ data }) => {
      this.sendMessage(data);
    };
  }

  startServer(timer: number, size: number) {
    this.intervalId = setInterval(() => {
      this.worker.postMessage(size);
    }, timer);
  }

  getMessages(): Observable<TableData> {
    return this.messagesSubject.asObservable();
  }

  stopServer() {
    clearInterval(this.intervalId);
  }

  updateServerParams(delay: number, size: number) {
    this.stopServer();
    this.startServer(delay, size);
  }

  private sendMessage(message: TableData) {
    this.messagesSubject.next(message);
  }
}
