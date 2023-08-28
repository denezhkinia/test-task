import { TableData } from '../../models/table-data';
import { TableView } from '../../models/table-view';

addEventListener('message', (event: MessageEvent<TableView>) => {
  const { tableData, ids } = event.data;
  if (tableData) {
    postMessage(convertData(tableData, ids));
  }
});

/**
 * Convert data to MatTableDataSource
 * @param data The tableData for table to convert
 * @param ids The ids for table to convert
 */
export function convertData(data: TableData[], ids: string[]): TableData[] {
  return data.slice(Math.max(data.length - 10, 1)).map((item, index) => (ids[index] ? changeId(item, ids[index]) : item));
}

/**
 * Change id of table data
 * @param data The tableData to change id
 * @param id new id
 */
export function changeId(data: TableData, id: string) {
  return {
    ...data,
    id,
  };
}
