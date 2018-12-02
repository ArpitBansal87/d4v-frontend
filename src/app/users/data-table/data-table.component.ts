import { UserDetails } from './../../core/typeFiles/user-details';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input()
  public dataValue: UserDetails[];
  
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'role','firstName','lastName','contactNo', 'bloodGroup' ];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort,this.dataValue);
  }
}
