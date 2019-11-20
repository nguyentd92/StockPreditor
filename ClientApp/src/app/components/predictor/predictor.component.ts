import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from "chartjs-plugin-annotation";
import { StockPredictorService } from 'src/app/services/stock-predictor.service';

const GENERAL_VALUE = 988.49;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.scss']
})
export class PredictorComponent implements OnInit {
  data: {
    chosen_id: string;
    mode: string;
    prediction: number
    predictions: number[];
    history: any;
    stocks: {
      stock_id: string;
      name: string;
    }[];
  } = {
    chosen_id: "VNINDEX",
    mode: "High",
    prediction: 1,
    predictions: [],
    history: [],
    stocks: [
      {
        stock_id: "VNINDEX",
        name: "VNINDEX"
      },
      {
        stock_id: "HUEUNI",
        name: "HUEUNI"
      }
    ]
  };

  chartBoundaries: {
    column: Label[];
    row: any[];
  } = {
    column: [],
    row: []
  };

  public lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    {
      data: [
        GENERAL_VALUE,
        1040.1628,
        972.2373,
        1014.4107,
        1035.4783,
        931.6329,
        955.923,
        950.9783,
        974.07385,
        914.521,
        957.234,
        859.05493,
        897.59155,
        825.77704
      ],
      label: "Prediction"
    }
  ];

  public ratings: any = [];

  public lineChartLabels: Label[] = [
    "8/27/2019",
    "8/28/2019",
    "8/29/2019",
    "9/1/2019",
    "9/3/2019",
    "9/6/2019",
    "9/8/2019",
    "9/11/2019",
    "9/13/2019",
    "9/16/2019",
    "9/18/2019",
    "9/21/2019",
    "9/23/2019",
    "9/26/2019"
  ];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left"
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)"
          },
          ticks: {
            fontColor: "red"
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 1,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno"
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "transparent",
      borderColor: "blue",
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: "red",
      pointHoverBorderColor: "transparent"
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private predictionService: StockPredictorService
  ) {}

  ngOnInit() {
    this.getData(1);
  }

  public switch(number) {
    this.data.prediction = number
    this.getData(number)
  }

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  getData(number) {
    // const general = GENERAL_VALUE;
    // this.lineChartData[0].data = this.predictionService.getData(number).prediction
    // const chartValues = this.lineChartData[0].data;
    // const chartRatings = this.ratings = []

    // chartRatings[0] = {
    //   difference: 0,
    //   rating: 0
    // }
    // for(let i = 1; i < chartValues.length; i++) {
    //   chartRatings[i] = 
    //     {
    //       difference: +chartValues[i]-+chartValues[i-1],
    //       rating: (+chartValues[i]-+chartValues[i-1])/+chartValues[i-1]
    //     }
      
    // }
    // console.log(this.ratings)
    // chartValues.forEach(
    //   (e) => {
    //     chartRatings.push({
    //       difference: e-general,
    //       rating: (e-general)/general
    //     })
    //   }
    // )
  }
}
