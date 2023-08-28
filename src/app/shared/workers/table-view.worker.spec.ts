import { convertData, changeId } from './table-view.worker';
import { idsMock, tableDataMock, tableDataMockWithNewIds } from '../mocks/table-data.mock';

describe('convertData Function Tests', () => {
  it('should convert data and change IDs', () => {
    const convertedData = convertData(tableDataMock, idsMock);

    expect(convertedData).toEqual(tableDataMockWithNewIds);
  });
});

describe('changeId Function Tests', () => {
  it('should change the ID of table data', () => {
    const changedData = changeId(tableDataMock[2], idsMock[0]);

    expect(changedData).toEqual(tableDataMockWithNewIds[0]);
  });
});
