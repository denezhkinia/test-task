import { TableData } from '../models/table-data';
import { TableView } from '../models/table-view';

addEventListener('message', (event: MessageEvent<TableView>) => {
  const { tableData, ids } = event.data;
  if (tableData) {
    postMessage(convertData(tableData, ids));
  }
});

function convertData(data: TableData[], ids: string[]): TableData[] {
  return data.slice(Math.max(data.length - 10, 1)).map((item, index) => (ids[index] ? changeId(item, ids[index]) : item));
}

function changeId(data: TableData, id: string) {
  return {
    ...data,
    id,
  };
}
