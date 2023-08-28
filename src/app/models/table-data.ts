export interface TableData {
  id: string;
  int: number;
  float: number;
  color: string;
  child: any; // I had some problems with this type here, when  I tried to import MatTableDataSource<ChildTableData>
  // got a lot of errors that's why I used any here, if I have no problems with ts I would use
  // "ChildTableData | MatTableDataSource<ChildTableData>" here
}

export interface ChildTableData {
  id: string;
  color: string;
}
