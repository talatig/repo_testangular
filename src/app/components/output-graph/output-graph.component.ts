import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  products: Object;

  public goptions: any = {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Comparison between prices for the same product'
    },

    tooltip: {
      formatter: function () {
        return 'Rating: <b>' + this.point.myData + '</b><br/>' + this.point.y + '<br/>' + this.point.series.name;
      }
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: Date.UTC(2019, 4, 27),
        pointInterval: 24 * 3600 * 1000 // one day
      }
    },

    // series: [{
    //     name: 'Installation',
    //     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    // }, {
    //     name: 'Manufacturing',
    //     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    // }, {
    //     name: 'Sales & Distribution',
    //     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    // }, {
    //     name: 'Project Development',
    //     data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    // }, {
    //     name: 'Other',
    //     data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    // }],

    series: [],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  // Begin : DATE RANGE PICKER
  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];
  // End : DATE RANGE PICKER

  subscription: Subscription;
  constructor(private dataservice: DataService) { }

  ngOnInit() {
    const storeNames = [];
    const prices = [];
    const dataarr = [];

    this.dataservice.getProducts().subscribe(response => {
      this.products = response.stores;

      response.stores.forEach(function (item, i) {
        storeNames.push(item.store_name);
        prices.push([item.price]);
        dataarr[i] = {};
        dataarr[i].y = item.price;
        dataarr[i].myData = item.rating;
      });
      console.log(dataarr);
      // this.options.series.push({
      //   name: storeNames[0],
      //   data: prices[0]
      // })
      // for (var i=0;i<storeNames.length;i++) {
      //   this.options.series.push({
      //     name: storeNames[i],
      //     data: prices[i]
      //   })
      // }
      for (let i = 0; i < storeNames.length; i++) {
        this.goptions.series.push({
          name: storeNames[i],
          data: [dataarr[i]]
        });
      }
      // this.storeNames = storeNames;

      // console.log(this.storeNames);

      // debugger;
      // this.chartLabels = storeNames;
      // this.chartDatasets[0].data = prices;

      Highcharts.chart('GraphDatacontainer', this.goptions);
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
      range: { fromDate: today, toDate: today },
      applyLabel: 'Submit'
      // cancelLabel: "Cancel",
      // excludeWeekends:true,
      // fromMinMax: {fromDate:fromMin, toDate:fromMax},
      // toMinMax: {fromDate:toMin, toDate:toMax}
    };
    // End : DATE RANGE PICKER

  }

  // Begin : DATE RANGE PICKER
  // handler function that receives the updated date range object
  updateRange(range: Range) {
    this.range = range;
  }

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
