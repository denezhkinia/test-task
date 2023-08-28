import { TestBed } from '@angular/core/testing';
import { PseudoSocketMockService } from '../mocks/pseudo-socket.service.mock';
import { TableData } from '../../models/table-data';

describe('PseudoSocketMockService', () => {
  let service: PseudoSocketMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PseudoSocketMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send messages to subscribers', done => {
    const testData: TableData[] = [
      {
        id: '1',
        int: 10,
        float: 3.14,
        color: 'red',
        child: { id: 'c1', color: 'blue' },
      },
    ];
    const expectedMessage = testData;

    service.getMessages().subscribe(message => {
      expect(message).toEqual(expectedMessage);
      done();
    });

    service['sendMessage'](testData);
  });
});
