import { ChildTableData, TableData } from '../../models/table-data';

const MAX_INT: number = 10000000;
const MAX_FLOAT: number = 1000;
const MAX_DECIMAL_PLACES: number = 18;

let ID = 0;

addEventListener('message', ({ data }) => {
  if (data) {
    postMessage(generateMockTableData(data));
  }
});

/**
 * Generate mock data for table
 * @param size The size of array to generate
 */
export function generateMockTableData(size: number): TableData[] {
  const mockData: TableData[] = [];
  for (let i = 0; i < size; i++) {
    mockData.push(generateRowData(ID.toString()));
    ID++;
  }
  return mockData;
}

/**
 * Generate mock data for table row
 * @param id The id of row
 */
export function generateRowData(id: string): TableData {
  return {
    id,
    int: Math.floor(Math.random() * MAX_INT),
    float: parseFloat((Math.random() * MAX_FLOAT).toFixed(MAX_DECIMAL_PLACES)),
    color: getRandomColor(),
    child: generateChildTableData(ID.toString()),
  };
}

/**
 * Generate mock data for child table.
 * @param id The id of row
 * @returns ChildTableData
 */
export function generateChildTableData(id: string): ChildTableData {
  return {
    id: 's-' + id,
    color: getRandomColor(),
  };
}

/**
 * Get random color
 * @returns Random color
 */
export function getRandomColor(): string {
  const colors = ['red', 'pink', '#03fce3', '#ca03fc', 'rgb(0, 0, 255)', 'hsl(120, 100%, 50%)'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
