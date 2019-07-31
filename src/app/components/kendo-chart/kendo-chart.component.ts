import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kendo-chart',
  templateUrl: './kendo-chart.component.html',
  styleUrls: ['./kendo-chart.component.scss']
})
export class KendoChartComponent implements OnInit {
  public events: string[] = [];
  public series: any[] = [{
          name: 'India',
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
      }, {
          name: 'Russian Federation',
          data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
      }, {
          name: 'Germany',
          data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
      }, {
          name: 'World',
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
      }];

  public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];

  public onRender(e): void {
      this.log('render');
  }

  public onAxisLabelClick(e): void {
      this.log('axisLabelClick', e);
  }

  public onLegendItemClick(e): void {
      this.log('legendItemClick', e);
  }

  public onLegendItemHover(e): void {
      this.log('legendItemHover', e);
  }

  public onPlotAreaClick(e): void {
      this.log('plotAreaClick', e);
  }

  public onPlotAreaHover(e): void {
      this.log('plotAreaHover', e);
  }

  public onSeriesClick(e): void {
      this.log('seriesClick', e);
  }

  public onSeriesHover(e): void {
      this.log('seriesHover', e);
  }

  private log(event: string, arg: any = null): void {
      this.events.push(`${event}`);
      console.log(arg);
  }
  constructor() { }

  ngOnInit() {
  }

}
