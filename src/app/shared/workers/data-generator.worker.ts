import { ChildTableData, TableData } from '../models/table-data';

const MAX_INT: number = 10000000;
const MAX_FLOAT: number = 1000;
const MAX_DECIMAL_PLACES: number = 18;

let ID = 0;

addEventListener('message', ({ data }) => {
  if (data) {
    postMessage(generateMockTableData(data));
  }
});

function generateMockTableData(size: number): TableData[] {
  const mockData: TableData[] = [];
  for (let i = 0; i < size; i++) {
    mockData.push(generateRowData(ID.toString()));
    ID++;
  }
  return mockData;
}

function generateRowData(id: string): TableData {
  return {
    id,
    int: Math.floor(Math.random() * MAX_INT),
    float: parseFloat((Math.random() * MAX_FLOAT).toFixed(MAX_DECIMAL_PLACES)),
    color: getRandomColor(),
    child: generateChildTableData(ID.toString()),
  };
}

function generateChildTableData(id: string): ChildTableData {
  return {
    id,
    color: getRandomColor(),
  };
}

function getRandomColor(): string {
  const colors = ['red', 'blue', '#03fce3', '#ca03fc', 'orange', 'purple'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
