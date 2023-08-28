import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TableData } from '../../models/table-data';

@Injectable({
  providedIn: 'root',
})
export class PseudoSocketMockService {
  private messagesSubject = new Subject<TableData[]>();
  private worker: Worker;
  private intervalId: any;

  constructor() {
    this.initWorker();
  }

  /**
   * Start server with given timer and size
   * @param delay Delay between send messages
   * @param size The size of array to send
   */
  startServer(delay: number, size: number) {
    this.intervalId = setInterval(() => {
      this.worker.postMessage(size);
    }, delay);
  }

  /**
   * Get messages from server
   * @returns Observable of TableData array
   */
  getMessages(): Observable<TableData[]> {
    return this.messagesSubject.asObservable();
  }

  stopServer() {
    clearInterval(this.intervalId);
  }

  /**
   * Update server params
   * @param delay Delay between send messages
   * @param size The size of array to send
   */
  updateServerParams(delay: number, size: number) {
    this.stopServer();
    this.startServer(delay, size);
  }

  /**
   * Init worker
   * @private
   */
  private initWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../workers/data-generator.worker', ''));

      this.worker.onmessage = ({ data }) => {
        this.sendMessage(data);
      };
    }
  }

  /**
   * Send message to subscribers
   * @param message The message to send
   * @private
   */
  private sendMessage(message: TableData[]) {
    this.messagesSubject.next(message);
  }
}
