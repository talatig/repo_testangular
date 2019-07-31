import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { sampleProducts } from './products';

import {GridComponent,GridDataResult,DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.scss']
})
export class KendoGridComponent implements OnInit {

  public close(status) {
    status.show = !status.show;
  }
 
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  sampleProductsMember = sampleProducts[0].ListInventorySupplyResponse.ListInventorySupplyResult.InventorySupplyList.member; 
  public state: State = {
    skip: 0,
    take: 10

    // Initial filter descriptor
    // filter: {
    //   logic: 'and',
    //   filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
    // }
};

public gridData: GridDataResult = process(this.sampleProductsMember, this.state);

public showTooltip(e: MouseEvent): void {
  const element = e.target as HTMLElement;
  //element.attributes[11].value=="2" is for third column ASIN 
  if ((element.nodeName === 'TD' || element.nodeName === 'TH')
  && element.attributes['ng-reflect-column-index'] && element.attributes['ng-reflect-column-index'].value=="2" ) {
      this.tooltipDir.toggle(element);
  } else {
      this.tooltipDir.hide();
  }
}

public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.sampleProductsMember, this.state);
}

  constructor() {  
    // console.log(this.sampleProductsMember); 
  }

  ngOnInit() {
  }

}
