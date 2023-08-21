export interface TableData {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildTableData;
}

export interface ChildTableData {
  id: string;
  color: string;
}
