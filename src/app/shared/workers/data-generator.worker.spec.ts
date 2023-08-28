import { generateChildTableData, generateMockTableData, generateRowData, getRandomColor } from './data-generator.worker';

describe('generateMockTableData Function Tests', () => {
  it('should generate mock table data', () => {
    const size = 5;
    const mockTableData = generateMockTableData(size);
    expect(mockTableData.length).toBe(size);
  });
});

describe('generateRowData Function Tests', () => {
  it('should generate valid row data', () => {
    const id = '1'; // Change this to the desired ID
    const rowData = generateRowData(id);
    expect(rowData).toBeTruthy();
    expect(rowData.id).toBe(id);
    expect(typeof rowData.int).toBe('number');
    expect(typeof rowData.float).toBe('number');
    expect(typeof rowData.color).toBe('string');
    expect(rowData.child).toBeTruthy();
  });
});

describe('generateChildTableData Function Tests', () => {
  it('should generate valid child table data', () => {
    const id = '1'; // Change this to the desired ID
    const childData = generateChildTableData(id);
    expect(childData).toBeTruthy();
    expect(childData.id).toContain(id);
    expect(typeof childData.color).toBe('string');
  });
});

describe('getRandomColor Function Tests', () => {
  it('should return a valid random color', () => {
    const randomColor = getRandomColor();
    const validColors = ['red', 'pink', '#03fce3', '#ca03fc', 'rgb(0, 0, 255)', 'hsl(120, 100%, 50%)'];
    expect(validColors).toContain(randomColor);
  });
});
