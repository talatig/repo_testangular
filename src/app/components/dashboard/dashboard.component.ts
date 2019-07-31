import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { DataService } from '../../services/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
import { range } from 'rxjs';
import { ExcelService } from '../../core/services/excel.service';
import { MatOption } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  row: any;
}

export interface UserData {
  Id: string;
  ASIN: string;
  FNSKU: string;
  Qty: string;
  Condition: string;
  Store: string;
  date: string;
}

export interface STORE {
  value: string;
  viewValue: string;
}

// const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
const Id: string[] = [];
const FNSKU: string[] = [];
const ASIN: string[] = [];
const Qty = [];
const Condition: string[] = [];
const Store: string[] = [];
const date: string[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  data: any = [];
  filteredRows: object[] = [];  
  dataSource = new MatTableDataSource<UserData>();
  selection = new SelectionModel<UserData>(true, []);  

  Stores: STORE[] = [
    { value: 'Shopify', viewValue: 'Shopify' },
    { value: 'Woocommerce', viewValue: 'Woocommerce' },
    { value: 'Amazon', viewValue: 'Amazon' }
  ];

  // Begin : DATE RANGE PICKER
  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];
  // End : DATE RANGE PICKER


  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  displayedColumns: string[] = ['select', 'Id', 'ASIN', 'FNSKU', 'Qty', 'Condition', 'Store', 'date'];
  //dataSource: MatTableDataSource<UserData>;

  // for single date picker
  // updateMyDate(event){
  //   var mydate = new Date(event);
  //   this.applyFilter(mydate.toLocaleDateString());
  // }

  searchFilter = new FormControl();
  storeFilter = new FormControl(); 

  filteredValues = { text:'', storeName:'', dateRange:{fromDate:new Date(),toDate:new Date()}};

  @ViewChild('TABLE') table: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dateRangePicker') dateRangePicker;

  @ViewChild('allSelected') private allSelected: MatOption;  

  // BEGIN-----STORE SELECT OPTION-------
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ASIN + 1}`;
  }
  // END-----STORE SELECT OPTION-------

  // ExportTOExcel() {
  //   let data = [];
  //   $('.mat-checkbox-checked').parents('tr').addClass('highlighted-row');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, 'SheetJS.xlsx');
  // }

  constructor(private dataservice: DataService, private excelService: ExcelService,public dialog: MatDialog) { }

  ExportTOExcel(): void {
    // debugger;
    this.filteredRows=[];
    this.dataSource.filteredData.forEach(row => {
      if(this.selection.isSelected(row)){
        this.filteredRows.push(row);
      }
    });   
    this.data=this.filteredRows;
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

  ngOnInit() {

    this.searchFilter.valueChanges.subscribe((searchFilterValue)=>{
      this.filteredValues['text'] = searchFilterValue;    
    });
  
    this.storeFilter.valueChanges.subscribe((storeFilterValue)=>{
      this.filteredValues['storeName'] = storeFilterValue;    
      this.dataSource.filter = JSON.stringify(this.filteredValues);    
    });

    this.dataservice.getAmazonReport().subscribe(response => {
      const members = response.ListInventorySupplyResponse.ListInventorySupplyResult.InventorySupplyList.member;
      members.forEach(function (item, i, array) {
        Id.push(item.Id);
        FNSKU.push(item.FNSKU);
        ASIN.push(item.ASIN);
        Qty.push(item.InStockSupplyQuantity);
        Condition.push(item.Condition);
        Store.push(item.Store);
        date.push(item.Date);
        if (i === array.length - 1) {
        }
      });

      // Create 100 users
      const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // this.dataSource.filterPredicate = (data: UserData, filter: string) => (data.Condition.toLowerCase().indexOf(filter) !== -1 ||
      // data.Qty.indexOf(filter) !== -1 );

      this.dataSource.filterPredicate = this.customFilterPredicate();
      // to filter using default range
      // this.updateRange({fromDate:new Date(), toDate: new Date()});
     
      // this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.storeFilter.setValue([...this.Stores.map(item => item.value), 0]);      
    });

    // Begin : DATE RANGE PICKER
    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    this.setupPresets();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: { fromDate: fromMin, toDate: today },
      applyLabel: 'Submit'
      // cancelLabel: "Cancel",
      // excludeWeekends:true,
      // fromMinMax: {fromDate:fromMin, toDate:fromMax},
      // toMinMax: {fromDate:toMin, toDate:toMax}
    };
    // End : DATE RANGE PICKER

  }

  onStoreClick(all){ 
    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     return false;
    }
    if(this.storeFilter.value.length==this.Stores.length)
      this.allSelected.select(); 
  }

  onASINClick(row){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {row: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.storeFilter
        .patchValue([...this.Stores.map(item => item.value), 0]);
    } else {
      this.storeFilter.patchValue([]);
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = function(data,filter) {
      let searchString = JSON.parse(filter);

      let textToSearch = searchString.text.toLowerCase();
      let storeNameToSearch = searchString.storeName.toString().toLowerCase(); 
      let dateRangeToSearch = searchString.dateRange; 

      let textFound = (data.ASIN.toString().trim().toLowerCase().indexOf(textToSearch) !== -1
      || data.FNSKU.toString().trim().toLowerCase().indexOf(textToSearch) !== -1
      || data.Qty.toString().trim().toLowerCase().indexOf(textToSearch) !== -1
      || data.Condition.toString().trim().toLowerCase().indexOf(textToSearch) !== -1  
      || data.Store.toString().trim().toLowerCase().indexOf(textToSearch) !== -1 
      || data.date.toString().trim().toLowerCase().indexOf(textToSearch) !== -1);

      let storeNameFound = storeNameToSearch.indexOf(data.Store.toString().trim().toLowerCase()) !== -1;

      const fromDate = new Date(dateRangeToSearch.fromDate).toLocaleDateString();
      const toDate = new Date(dateRangeToSearch.toDate).toLocaleDateString();      
      let dateRangeFound = data.date >= fromDate && data.date <= toDate;         
      if(textToSearch=='' && storeNameToSearch==''){
        return dateRangeFound && storeNameFound;
      } else {
        if(textToSearch!='' && storeNameToSearch==''){
          return (textFound && dateRangeFound && storeNameFound);
        } else if(textToSearch=='' && storeNameToSearch!='') {
          return (storeNameFound && dateRangeFound);       
        } else if(textToSearch!='' && storeNameToSearch!='') {
          return (textFound && storeNameFound && dateRangeFound);       
        }
        else {
          return (textFound || storeNameFound || dateRangeFound)
        }        
      }

      // if (searchString.topFilter) {
          // return (textFound || storeNameFound || dateRangeFound)
      // } else {
      //     return nameFound && positionFound 
      // }
    }
    return myFilterPredicate;
  }

  changeStore(filterValue) {
    // console.log(filterValue);
    // this.applyFilter(filterValue);
  }

  applyFilter(filterValue: string) {
    let filter = {
      text: filterValue.trim().toLowerCase(),
      storeName: this.filteredValues['storeName'],
      dateRange: this.range
    }    
    this.dataSource.filter = JSON.stringify(filter);    
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  applyFilter2() {
    if (this.dataSource) {
      this.dataSource.filter = '' + Math.random();
    }
  }


  // Begin : DATE RANGE PICKER
  // handler function that receives the updated date range object
// tslint:disable-next-line: no-shadowed-variable
  updateRange(range: Range) {
    this.range = range;
    this.filteredValues['dateRange'] = range;
    if (this.dataSource) {
      this.dataSource.filter = JSON.stringify(this.filteredValues); 
    }   
    // this.applyFilter2();
  }

  clearFilters() {
    const today=new Date();
    this.filteredValues={
      text:'',
      storeName:'',
      dateRange:{fromDate:new Date(today.getFullYear(), today.getMonth() - 2, 1),toDate:today}
    }
    // this.updateRange(this.filteredValues['dateRange']);
    this.searchFilter.setValue('');
    this.storeFilter.setValue([...this.Stores.map(item => item.value), 0]);  
    this.dateRangePicker.resetDates(this.filteredValues['dateRange']);
  }

  // helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
// tslint:disable-next-line: no-shadowed-variable
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    };

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      { presetLabel: 'Yesterday', range: { fromDate: yesterday, toDate: today } },
      { presetLabel: 'Last 7 Days', range: { fromDate: minus7, toDate: today } },
      { presetLabel: 'Last 30 Days', range: { fromDate: minus30, toDate: today } },
      { presetLabel: 'This Month', range: { fromDate: currMonthStart, toDate: currMonthEnd } },
      { presetLabel: 'Last Month', range: { fromDate: lastMonthStart, toDate: lastMonthEnd } }
    ];
  }
  // End : DATE RANGE PICKER

}
// function parse_dom_table(table, _opts) {
//   let rows = table.getElementsByClassName('highlighted-row');
// }


/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  return {
    Id: id.toString(),
    ASIN: ASIN[Math.round(Math.random() * (ASIN.length - 1))],
    FNSKU: FNSKU[Math.round(Math.random() * (FNSKU.length - 1))],
    Qty: Qty[Math.round(Math.random() * (Qty.length - 1))],
    Condition: Condition[Math.round(Math.random() * (Condition.length - 1))],
    Store: Store[Math.round(Math.random() * (Store.length - 1))],
    date: date[Math.round(Math.random() * (date.length - 1))]
  };
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}