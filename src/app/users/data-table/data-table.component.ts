import { RolesFormat } from './../../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../../core/typeFiles/user-details';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { CommonDataService } from 'src/app/core/dataServices/common-data.service';

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
  @Input()
  public dataRoleList: RolesFormat[];
  @Output() initiateDetailsCard = new EventEmitter<string>();

  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'contactNo', 'bloodGroup'];

  constructor(private dataService: CommonDataService) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.dataValue, this.dataRoleList);
    setTimeout(() => {this.dataService.initiateCloseLoadingIcon(); });
  }

  passUserDetails(rowIdValue) {
    this.initiateDetailsCard.emit(rowIdValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('inside ng on changes for data table');
    if ((changes.dataValue != undefined && changes.dataValue.currentValue.length != 0 )
    || (changes.dataRoleList != undefined && changes.dataRoleList.currentValue.length != 0)) {
      this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.dataValue, this.dataRoleList);
    }
  }
}
