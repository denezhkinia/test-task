import { TableDataConverterService } from './table-data-converter.service';
import { TableData } from '../models/table-data';
import { MatTableDataSource } from '@angular/material/table';

jest.mock('@angular/material/table', () => ({
  MatTableDataSource: class {
    private data: TableData[];
    constructor(data: TableData[]) {
      this.data = data;
    }
  },
}));

describe('TableDataConverterService', () => {
  let service: TableDataConverterService;

  beforeEach(() => {
    service = new TableDataConverterService();
  });

  test('dataToSource should convert data correctly', () => {
    const input = [
      {
        id: '1',
        int: 10,
        float: 3.14,
        color: 'red',
        child: { id: 'c1', color: 'blue' },
      },
      {
        id: '2',
        int: 20,
        float: 6.28,
        color: 'green',
        child: { id: 'c2', color: 'yellow' },
      },
    ];

    const expectedOutput = new MatTableDataSource([
      {
        id: '1',
        int: 10,
        float: 3.14,
        color: 'red',
        child: new MatTableDataSource([{ id: 'c1', color: 'blue' }]),
      },
      {
        id: '2',
        int: 20,
        float: 6.28,
        color: 'green',
        child: new MatTableDataSource([{ id: 'c2', color: 'yellow' }]),
      },
    ]);

    const output = service.dataToSource(input);

    expect(output.data).toEqual(expectedOutput.data);
  });
});
