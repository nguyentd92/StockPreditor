import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from "chartjs-plugin-annotation";
import { StockPredictorService } from 'src/app/services/stock-predictor.service';
import { CalcDatePipe } from 'src/app/core/pipes/calc-date.pipe';
import { DatePipe } from '@angular/common';

const GENERAL_VALUE = 988.49;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.scss']
})
export class PredictorComponent implements OnChanges {
  @Input() values: number[]
  @Input() arrDate: string[]

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
      label: "Dự đoán"
    }
  ];

  public ratings: any = [];

  public lineChartLabels: Label[] = [];

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
    private _calcDatePipe: CalcDatePipe,
    private _datePipe: DatePipe
  ) {}

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

  ngOnChanges() {
    if (this.values) {
      this.lineChartData[0].data = this.values
    }

    if (this.arrDate) {
      this.lineChartLabels = [...this.arrDate].reverse()
    }
  }
}
