import { Injectable } from '@angular/core';
import { TableData } from '../models/table-data';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class TableDataConverterService {
  /**
   * Convert data to MatTableDataSource
   * @param data The data for table to convert
   */
  dataToSource(data: TableData[]) {
    const dataWithChildSource = data.map(item => ({
      ...item,
      child: new MatTableDataSource([{ ...item.child }]),
    }));
    return new MatTableDataSource(dataWithChildSource);
  }
}
