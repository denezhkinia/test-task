import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../models/table-data';
import { TableDataConverterService } from '../../services/table-data-converter.service';

@Component({
  selector: 'b2b-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @Input() tableData: TableData[];

  dataSource: MatTableDataSource<TableData>;
  displayedColumns: string[] = ['id', 'int', 'float', 'color', 'child'];
  displayedColumnsChild: string[] = ['id', 'color'];

  constructor(private converter: TableDataConverterService) {}

  ngOnChanges(): void {
    this.dataSource = this.converter.dataToSource(this.tableData);
  }
}
